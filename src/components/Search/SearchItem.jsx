import ClickAwayListener from '@mui/base/ClickAwayListener';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
export default function SearchItem({ dataSearch, setIsOpen, setValueSearch }) {
    const history = useNavigate();

    const isEmptySearch = dataSearch.length > 0;

    const handleClickItem = (slug) => {
        setValueSearch('');
        setIsOpen(false);
        history(`/catalog/${slug}`);
    };

    return (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50px',
                    width: '100%',
                    maxHeight: '400px',
                    overflow: 'scroll',
                    backgroundColor: 'white',
                    height: 'fit-content',
                    textAlign: 'center',
                }}
            >
                {isEmptySearch ? (
                    dataSearch.map((item, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', padding: '5px', cursor: 'pointer' }}
                            onClick={() => handleClickItem(item.slug)}
                        >
                            <img src={item?.images[0]} alt="nothing" width={50} />
                            <span style={{ fontSize: 16, paddingLeft: '15px' }}>{item?.title}</span>
                        </div>
                    ))
                ) : (
                    <em style={{ fontSize: 16 }}>Không tìm thấy sản phẩm</em>
                )}
            </Box>
        </ClickAwayListener>
    );
}
