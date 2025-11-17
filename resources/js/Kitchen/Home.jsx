import BaseAdminto from '@Adminto/BaseHorizontal';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import useWebSocket from '../Hooks/useWebSocket';
import { useEffect, useRef, useState } from 'react';
import OrdersRest from '../Actions/Restaurant/OrdersRest';
import KanbanCard from '../Reutilizables/Orders/KanbanCard';
import OrderCard from '../Reutilizables/Orders/OrderCard';

// Rests
const ordersRest = new OrdersRest()

const audio = new Audio('/assets/sounds/notification.mp3');

const Home = ({ orders: ordersDB }) => {
    const [orders, setOrders] = useState(ordersDB);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const { socket } = useWebSocket()

    const onOrderChanged = (order) => {
        console.log(order);
        setOrders(prev => {
            const exists = prev.some(o => o.id === order.id);
            if (exists) {
                return prev.map(o => o.id === order.id ? order : o);
            } else {
                audio.play();
                return [...prev, order];
            }
        });
    }

    const onStatusChanged = async (orderId, statusId) => {
        const result = await ordersRest.save({
            id: orderId,
            status_id: statusId
        })
        onOrderChanged(result)
    }

    useEffect(() => {
        socket.on('order.created', (order) => onOrderChanged(order))
        socket.on('order.updated', (order) => onOrderChanged(order))

        return () => {
            socket.off('order.created')
            socket.off('order.updated')
        }
    }, [socket])

    // Listen to fullscreen changes (F11 or browser controls)
    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    // Pipeline stages (3 columnas): Confirmado, Preparando, Listo para recojo
    const confirmedOrders = orders.filter(o => o.status_id === 'be7e24c9-a3e4-444e-adab-bb301b4ccce3');
    const preparingOrders = orders.filter(o => o.status_id === '1eb603e6-e078-4f9f-8c86-25a363742518');
    const readyOrders = orders.filter(o => o.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279');

    return <div className="row">
        <div className="col-md-4">
            <KanbanCard title="CONFIRMADO" length={confirmedOrders.length}>
                {confirmedOrders.map(order => <OrderCard
                    key={order.id} {...order}
                    confirmText={<>Preparar <i className="mdi mdi-arrow-right"></i></>}
                    onConfirm={() => onStatusChanged(order.id, '1eb603e6-e078-4f9f-8c86-25a363742518')}
                />)}
            </KanbanCard>
        </div>

        <div className="col-md-4">
            <KanbanCard title="PREPARANDO" length={preparingOrders.length}>
                {preparingOrders.map(order => <OrderCard
                    key={order.id} {...order}
                    confirmText={<>Listo <i className="mdi mdi-arrow-right"></i></>}
                    onConfirm={() => onStatusChanged(order.id, 'f0a538f0-8aef-4ca7-80d1-297ab6c58279')}
                />)}
            </KanbanCard>
        </div>

        <div className="col-md-4">
            <KanbanCard title="LISTO PARA RECOJO" length={readyOrders.length}>
                {readyOrders.map(order => <OrderCard key={order.id} {...order} />)}
            </KanbanCard>
        </div>
    </div>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(<BaseAdminto {...properties} title='Cocina'>
        <Home {...properties} />
    </BaseAdminto>);
})