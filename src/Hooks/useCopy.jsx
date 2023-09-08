import { useState } from 'react';
const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState(null);

    const copy = async (text) => {
        if (!navigator?.clipboard) {
            return false;
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            return true;
        } catch (error) {
            setCopiedText(null);
            return false;
        }
    };

    return [copiedText, copy];
};

export default useCopyToClipboard;
