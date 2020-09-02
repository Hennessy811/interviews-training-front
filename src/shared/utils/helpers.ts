export const isDev = () => process.env.NODE_ENV === 'development';
export const BASE_URL = isDev() ? 'http://localhost:3000' : 'https://interview-trainer.ml';

export const tagsColors = [
    { text: 'easy', color: 'green' },
    { text: 'hard', color: 'red' },
    { text: 'medium', color: 'orange' },
    { text: 'react', color: 'blue' },
    { text: 'js', color: 'volcano' },
    { text: 'company set', color: 'magenta' },
];
