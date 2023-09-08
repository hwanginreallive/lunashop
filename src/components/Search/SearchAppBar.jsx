import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { useGetListProductsQuery } from '~/redux/api/productApi/productApi';
import handleString from '~/utils/handleString';
import SearchItem from './SearchItem';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        fontSize: '16px',
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '12ch',
            '&:focus': {
                width: '30ch',
            },
        },
        [theme.breakpoints.down('md')]: {
            width: 0,
            paddingLeft: `calc(1em + ${theme.spacing(2)})`,
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    const [dataDisplay, setDataDisplay] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useGetListProductsQuery();

    useEffect(() => {
        if (data) setDataDisplay(data);
    }, [data]);

    useEffect(() => {
        valueSearch ? setIsOpen(true) : setIsOpen(false);
    }, [valueSearch]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setValueSearch(value);
        const dataSearch = dataDisplay.filter((item) => {
            return handleString(item.title).includes(handleString(value));
        });

        if (dataSearch) {
            setDataSearch(dataSearch);
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', borderRadius: '100px', position: 'relative' }}>
                <Search
                    sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: '25px',
                        },
                    }}
                >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase value={valueSearch} onChange={handleSearch} placeholder="Tìm kiếm" />
                </Search>
            </Box>
            {isOpen && <SearchItem dataSearch={dataSearch} setIsOpen={setIsOpen} setValueSearch={setValueSearch} />}
        </>
    );
}
