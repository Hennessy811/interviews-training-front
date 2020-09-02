import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const state = useSelector((state: RootStore) => state.user.data);
    const localData = localStorage.getItem('user');
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        if (localData) {
            const d = JSON.parse(localData);
            setAuth(d);
        }
    }, [localData]);

    return state || auth;
};
