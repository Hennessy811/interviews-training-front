import { BASE_URL } from '../../utils/helpers';
import { ScenesResponse } from '../../../store/Scenes/scenes.reducer';

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const addScene = async (data: ScenesResponse): Promise<ScenesResponse> => {
    console.log({ data });

    return await fetch(`${BASE_URL}/scenes/add`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then((r) => r.json());
};
