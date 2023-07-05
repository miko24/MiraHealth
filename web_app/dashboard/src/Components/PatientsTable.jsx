import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {Breadcrumb, Table} from 'antd';
import {useEffect, useState} from 'react';
import StatsModal from "./StatsModal";
import {Link} from "react-router-dom";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
    },
    {
        title: 'Mac Address',
        dataIndex: 'mac_address',
    },
    {
        title: 'Phone number',
        dataIndex: 'phone_number'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    }
];
const Row = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        cursor: 'move',
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};
const App = () => {
    const [dataSource, setDataSource] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [openModal, setOpenModal] = useState(false);


    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const users = await fetch("http://34.159.120.168:9009/patients");
                const data = await users.json();
                setDataSource(data && data.map((user, idx) => ({
                    key: idx, first_name: user.first_name,
                    last_name: user.last_name, email: user.email, mac_address: user.mac_address,
                    phone_number: user.phone_number, id: user.id
                })));
            } catch (e) {
                console.log(e)
            }

        }

        fetch_data();
    }, []);

    return (
        <>
            <StatsModal open={openModal} setOpen={setOpenModal} user={selectedUser} />
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    // rowKey array
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        rowKey="key"
                        columns={columns}
                        dataSource={dataSource}
                        onRow={(record, rowIndex) => {
                            return {
                                onDoubleClick: (event) => {
                                    setSelectedUser(record);
                                    setOpenModal(true);
                                    console.log(record);
                                }, // double click row
                            };
                        }}
                    />
                </SortableContext>
            </DndContext>
        </>

    );
};
export default App;