import React, { useEffect, useState } from 'react';
import styles from './CreateScenario.module.scss';
import cn from 'classnames';
import { Typography, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { ScenesActions } from '../../store/Scenes/scenes.actions';

const CreateScenario = () => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');

    const dispatch = useDispatch();

    console.log('kek');

    // const ontitle = (value: string) => {
    //     set
    // }

    return (
        <div>
            <Typography.Title>Создать сет</Typography.Title>

            <div>
                <Typography.Text>Название</Typography.Text>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    title="qwe"
                    placeholder="введите название сета"
                ></Input>
            </div>
            <div className="mt-15">
                <Typography.Text>Теги через ","</Typography.Text>
                <Input
                    value={tags}
                    onChange={(e) => {
                        setTags(e.target.value);
                    }}
                    title="qwe"
                    placeholder="сбербанк, для дебилов, изи, жоска"
                ></Input>
            </div>
            <Button
                onClick={() => {
                    dispatch({
                        type: ScenesActions.SAVE_SCENE_PENDING,
                        payload: {
                            title,
                            tags: tags.split(',').map((i) => i.trim()),
                        },
                    });
                }}
            >
                Создать
            </Button>
            {/* <div className="mt-15">
                <Typography.Text></Typography.Text>
                <Input title="qwe" placeholder="сбербанк, для дебилов, изи, жоска"></Input>
            </div> */}
        </div>
    );
};

export default CreateScenario;
