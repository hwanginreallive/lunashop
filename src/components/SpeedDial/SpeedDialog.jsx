import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import useCopyToClipboard from '~/Hooks/useCopy';
import { notifyError, notifySuccess } from '../Toasts/Toast';
const SpeedDialog = ({ setIsChatBotOpen }) => {
    const handleOpen = () => {
        setIsChatBotOpen(true);
    };
    const [, copy] = useCopyToClipboard();

    const handleCopy = async () => {
        if (window.location.origin) {
            await copy(window.location.href);
            notifySuccess('Copy thành công');
        } else {
            notifyError('copy thất bại');
        }
    };
    const actions = [
        { icon: <QuestionAnswerIcon />, name: 'Chat bot', action: handleOpen },
        { icon: <FileCopyIcon />, name: 'Copy', action: handleCopy },
        { icon: <ShareIcon />, name: 'Share' },
    ];
    return (
        <Box
            sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
            style={{ position: 'fixed', bottom: 30, right: 30 }}
        >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};

export default SpeedDialog;
