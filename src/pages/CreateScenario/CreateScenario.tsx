import React, { useEffect, useState, useReducer, useRef } from 'react';
import styles from './CreateScenario.module.scss';
import cn from 'classnames';
import { Typography, Input, Button, Divider, Form, Select, Space, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { ScenesActions } from '../../store/Scenes/scenes.actions';
import { FormInstance } from 'antd/lib/form';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { createScenarioInitialState, createScenarioReducer, StateActions, Question } from './CreateScenario.store';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

const CreateScenario = () => {
    const [state, dispatch] = useReducer(createScenarioReducer, createScenarioInitialState);
    const formRef = useRef<FormInstance>(null);
    const appDispatch = useDispatch();
    const { title, tags, sections } = state;

    const onFinish = (values: any) => {
        console.log(values, sections);

        appDispatch({
            type: ScenesActions.SAVE_SCENE_PENDING,
            payload: {
                title: values.title,
                tags: values.tags.split(',').map((i: string) => i.trim()),
                sections,
            },
        });
    };

    // const onReset = () => {
    //     const ref = formRef.current;
    //     if (ref) {
    //         ref.resetFields();
    //     }
    // };

    return (
        <div className={styles.form}>
            <Typography.Title>Создать сет</Typography.Title>
            <Typography.Title level={4}>Общие</Typography.Title>
            <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
                <Form.Item name="title" label="Название" rules={[{ required: true, message: 'Это обязательное поле' }]}>
                    <Input placeholder="вводить сюда" />
                </Form.Item>
                <Form.Item name="tags" label="Теги" rules={[{ required: true, message: 'Это обязательное поле' }]}>
                    <Input placeholder="javascript, react, easy" />
                </Form.Item>

                <Divider></Divider>
                <Typography.Title level={4}>Группы вопросов</Typography.Title>

                <div>
                    {
                        // @ts-ignore
                        sections.map((section) => (
                            <div key={section.id} className="mt-10 mb-10">
                                <Card>
                                    <Input
                                        size="large"
                                        placeholder="название группы"
                                        value={section.title}
                                        onChange={(e) => {
                                            dispatch({
                                                type: StateActions.CHANGE_SECTION,
                                                payload: {
                                                    id: section.id,
                                                    title: e.target.value,
                                                },
                                            });
                                        }}
                                    />

                                    {section.questions?.map((question: Question) => (
                                        <div key={question.id} className="d-flex mt-10 mb-10">
                                            <Input
                                                placeholder="вопрос"
                                                value={question.title}
                                                className="mr-15"
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: StateActions.CHANGE_QUESTION,
                                                        payload: {
                                                            questionId: question.id,
                                                            sectionId: section.id,
                                                            title: e.target.value,
                                                        },
                                                    });
                                                }}
                                            />
                                            <Button
                                                danger
                                                onClick={() => {
                                                    dispatch({
                                                        type: StateActions.REMOVE_QUESTION,
                                                        payload: { sectionId: section.id, questionId: question.id },
                                                    });
                                                }}
                                            >
                                                <DeleteOutlined />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="dashed"
                                        className="mt-15 mr-15"
                                        onClick={() => {
                                            dispatch({
                                                type: StateActions.ADD_QUESTION,
                                                payload: section.id,
                                            });
                                        }}
                                    >
                                        <PlusOutlined />
                                        Добавить вопрос
                                    </Button>
                                    <Button
                                        type="dashed"
                                        danger
                                        className="mt-15"
                                        onClick={() => {
                                            dispatch({
                                                type: StateActions.REMOVE_SECTION,
                                                payload: section.id,
                                            });
                                        }}
                                    >
                                        <DeleteOutlined />
                                        Удалить группу
                                    </Button>
                                </Card>
                            </div>
                        ))
                    }
                    <Button
                        type="dashed"
                        onClick={() => {
                            console.log({ sections });

                            dispatch({ type: StateActions.ADD_SECTION });
                        }}
                    >
                        <PlusOutlined />
                        Добавить группу
                    </Button>
                </div>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                        {/* <Button htmlType="button" onClick={onReset}>
                            Сбросить
                        </Button> */}
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateScenario;
