import { Button, Popconfirm, Table, TableColumnsType, notification } from "antd";
import { useEffect, useState } from "react";
export interface Tracks {
    _id: string,
    title: string,
    description: string,
    category: string,
    imgUrl: string,
    trackUrl: string,
    uploader: {
        _id: string,
        email: string,
        name: string,
        role: string,
        type: string
    },
    countLike: number,
    countPlay: number

    // "_id": "65f8443db032bcbf11b806c7",
    // "title": "Miên man",
    // "description": "Taylor Swift",
    // "category": "CHILL",
    // "imgUrl": "default.png",
    // "trackUrl": "CHILL.mp3",
    // "countLike": 866,
    // "countPlay": 662,
    // "uploader": {
    //     "_id": "65f8443db032bcbf11b806c2",
    //     "email": "admin@gmail.com",
    //     "name": "I'm admin1",
    //     "role": "ADMIN",
    //     "type": "SYSTEM"
    // },
    // "isDeleted": false,
    // "__v": 0,
    // "createdAt": "2024-03-18T13:40:13.636Z",
    // "updatedAt": "2024-03-18T13:40:13.636Z"
}
const TracksTable = () => {
    const [listTracks, setListTracks] = useState([])
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });

    const access_token = localStorage.getItem("access_token") as string;
    useEffect(() => {
        getData();
    }, [])



    const getData = async () => {
        const res = await fetch(
            `http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
            })

        const dataUsers = await res.json();

        //check data API reload
        if (!dataUsers.data) {
            notification.error({
                message: JSON.stringify(dataUsers.message)
            })
        }
        setListTracks(dataUsers.data.result);
        setMeta({
            current: dataUsers.data.meta.current,
            pageSize: dataUsers.data.meta.pageSize,
            pages: dataUsers.data.meta.pages,
            total: dataUsers.data.meta.total
        })
    }
    const confirm = async (track: Tracks) => {


        const res = await fetch(
            `http://localhost:8000/api/v1/tracks/${track._id} `,
            {

                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"

                },
                method: "DELETE",
            }
        )
        const dataPost = await res.json();


        //check error
        if (dataPost.data) {
            await getData();
            notification.success({

                message: JSON.stringify(dataPost.message),
                description: "Xóa track nhạc thành công"
            })
        }
        else {
            notification.warning({

                message: JSON.stringify(dataPost.message),
                description: "Không thể thực hiện xóa track nhạc"
            })
        }
    };

    const columns: TableColumnsType<Tracks> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (value, record, index) => {
                return (<p>{(meta.current - 1) * (meta.pageSize) + (index + 1)}</p>)
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (value, record) => {
                return (<a>{record.title}</a>)
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Track Url',
            dataIndex: 'trackUrl',
        },
        {
            title: 'Uploader',
            // dataIndex: 'uploader',
            // render: (value, record) => {
            //     return (<p>{record.uploader.name}</p>)
            // }
            dataIndex: ['uploader', 'name']
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <div>
                        <Popconfirm
                            title="Delete the Users"
                            description={`Are you sure to delete this user. name = ${record.title}?`}
                            onConfirm={() => { confirm(record) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>

                    </div >
                )
            }
        }
    ]

    const handleOnchangePage = async (page: number, pagesize: number) => {

        const res = await fetch(
            `http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pagesize}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
            })

        const dataUsers = await res.json();

        //check data API reload
        if (!dataUsers.data) {
            notification.error({
                message: JSON.stringify(dataUsers.message)
            })
        }
        setListTracks(dataUsers.data.result);
        setMeta({
            current: dataUsers.data.meta.current,
            pageSize: dataUsers.data.meta.pageSize,
            pages: dataUsers.data.meta.pages,
            total: dataUsers.data.meta.total
        })
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}      >

                <h2>Table Users</h2>


            </div>
            <Table
                columns={columns}
                dataSource={listTracks}
                rowKey={"_id"}
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pagesize: number) => handleOnchangePage(page, pagesize),
                    showSizeChanger: true

                }}
            ></Table>

        </div >
    )
}
export default TracksTable;