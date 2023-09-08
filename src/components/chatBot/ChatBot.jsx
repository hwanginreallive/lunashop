import { Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import ReactLoading from 'react-loading';
import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Prism } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import useOnclickOutside from '~/Hooks/useOnclickOutside';
import dataTrain from '../../assets/fake-data/data.json';
import chatGpt from '../../assets/images/chatGpt.svg';
import { SSE } from '../../utils/see';
import './chatbot.scss';
const messageType = {
    user: 'user',
    assistant: 'assistant',
};

export default function Chatbot({ setIsChatBotOpen }) {
    const [loader, setLoader] = useState(false);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Xin chào tôi là chatbot của Lunashop!',
        },
    ]);

    const inputRef = useRef();
    const boxRef = useRef();
    const chatRef = useRef(null);
    const resultRef = useRef('');
    useOnclickOutside(boxRef, () => setIsChatBotOpen(false));

    const API_KEY = process.env.REACT_APP_API_KEY;
    const URL = process.env.REACT_APP_URL;

    const getRes = async () => {
        if (question !== '') {
            setLoader(true);
            const newMessages = [
                ...messages,
                {
                    role: messageType.user,
                    content: question,
                },
            ];

            const requestsQuestion = [
                ...dataTrain,
                ...messages,
                {
                    role: messageType.user,
                    content: question,
                },
            ];

            setMessages(newMessages);
            const url = URL;
            const data = {
                model: 'gpt-3.5-turbo',
                messages: requestsQuestion,
                temperature: 0.75,
                top_p: 0.95,
                stream: true,
                n: 1,
            };

            const source = new SSE(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
                method: 'POST',
                payload: JSON.stringify(data),
            });
            source.addEventListener('message', (e) => {
                if (e.data !== '[DONE]') {
                    setLoader(false);
                    let payload = JSON.parse(e.data);
                    if (payload?.choices[0]?.delta?.content) {
                        let text = payload?.choices[0]?.delta?.content;
                        if (text !== '\n') {
                            resultRef.current = resultRef.current + text;
                            setMessages([
                                ...newMessages,
                                {
                                    role: messageType.assistant,
                                    content: resultRef.current,
                                },
                            ]);
                            setQuestion('');
                        }
                    }
                } else {
                    source.close();
                    resultRef.current = '';
                }
            });

            source.addEventListener('readystatechange', (e) => {
                if (e.readyState >= 2) {
                    setLoader(false);
                }
            });
            source.addEventListener('error', (e) => {
                if (e.data) {
                    setMessages([
                        ...newMessages,
                        {
                            role: messageType.assistant,
                            content: 'Xin lỗi anh/chị AIV SaleBot không thể phục vụ vào lúc này',
                        },
                    ]);
                }
            });

            source.stream();
        }
    };

    // xoá text mỗi khi gửi

    const handleSubmit = () => {
        getRes();
    };

    const handleClears = () => {
        setMessages([{ role: messageType.assistant, content: 'Xin chào tôi là chatbot của Lunashop!' }]);
        setQuestion('');
    };

    const handleOnKeyUp = (event) => {
        const searchValue = event.target.value.trim();
        if (event.key === 'Enter' && searchValue) {
            setQuestion(searchValue);
            getRes();
            setQuestion('');
        }
    };

    const handleChange = (event) => {
        setQuestion(event.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'; // reset the height
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [question]);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat">
            {
                <div className="box-chat py-5" ref={boxRef}>
                    <div className="row ">
                        <div
                            className="col-md-12 col-lg-12 col-xl-12 py-3"
                            style={{
                                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                            }}
                        >
                            <div className="card" id="chat2">
                                <div className="card-header " style={{ width: '100%' }}>
                                    <Typography variant="h6">Luna Chatbot</Typography>
                                    <Button onClick={() => setIsChatBotOpen(false)} style={{ fontSize: '12px' }}>
                                        <GrClose />
                                    </Button>
                                </div>
                                <div
                                    className="card-body"
                                    data-mdb-perfect-scrollbar="true"
                                    style={{
                                        position: 'relative',
                                        height: '300px',
                                        overflowY: 'scroll',
                                    }}
                                >
                                    {messages?.map((item, idx) =>
                                        item?.role === 'assistant' ? (
                                            <div
                                                key={idx}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    flexDirection: 'start',
                                                    marginBottom: 10,
                                                }}
                                            >
                                                <img src={chatGpt} alt="avatar 1" style={{ width: '45px' }} />
                                                <div
                                                    style={{
                                                        minHeight: 45,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        maxWidth: 270,
                                                    }}
                                                >
                                                    <ReactMarkdown
                                                        className="text-mess"
                                                        remarkPlugins={[remarkGfm, remarkMath]}
                                                        rehypePlugins={[rehypeKatex]}
                                                        components={{
                                                            code({ node, inline, className, children, ...props }) {
                                                                const match = /language-(\w+)/.exec(className || '');
                                                                return !inline && match ? (
                                                                    <Prism
                                                                        children={String(children).replace(/\n$/, '')}
                                                                        style={dark}
                                                                        language={match[1]}
                                                                        PreTag="div"
                                                                        {...props}
                                                                    />
                                                                ) : (
                                                                    <code className={className} {...props}>
                                                                        {children}
                                                                    </code>
                                                                );
                                                            },
                                                        }}
                                                    >
                                                        {item?.content}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                key={idx}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    marginBottom: 10,
                                                }}
                                            >
                                                <div className="text-mess text-mess-question ">{item?.content}</div>
                                                <div style={{ fontSize: '20px', marginLeft: '10px' }}>
                                                    <AiOutlineUser />
                                                </div>
                                            </div>
                                        ),
                                    )}
                                    <div ref={chatRef} />
                                    {loader && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={chatGpt}
                                                alt="avatar 1"
                                                style={{ width: '45px', height: '100%' }}
                                            />
                                            <div>
                                                <ReactLoading type="bubbles" color="gray" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="card-footer bg-white text-muted d-flex  p-3"
                                    style={{
                                        width: '100%',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div className="text-era" style={{ marginBottom: '5px', alignItems: 'center' }}>
                                        <textarea
                                            ref={inputRef}
                                            value={question}
                                            autoFocus
                                            onChange={(e) => handleChange(e)}
                                            onKeyUp={(e) => handleOnKeyUp(e)}
                                            placeholder="Nhập câu hỏi ..."
                                            style={{
                                                width: '100%',
                                                padding: 10,
                                                paddingTop: 20,
                                                height: 67,
                                                maxHeight: '100px',
                                                fontSize: '16px',
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '10px',
                                            justifyContent: 'flex-end',
                                            padding: '20px 0',
                                        }}
                                    >
                                        {messages?.length > 1 && (
                                            <Button variant="contained" onClick={() => handleClears()}>
                                                Xóa
                                            </Button>
                                        )}
                                        <Button variant="contained" onClick={() => handleSubmit()}>
                                            Gửi
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
