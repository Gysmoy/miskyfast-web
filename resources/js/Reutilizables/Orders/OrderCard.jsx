import Number2Currency from "../../Utils/Number2Currency"

const OrderCard = ({ confirmText, cancelText, onConfirm, onCancel, showContact = false, showTotal = false, ...order }) => {
    return <div className="card mb-2" style={{ borderLeft: `4px solid ${order?.status?.color}` }}>
        <div className="card-body p-2">
            <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
                <div className="d-flex gap-2 align-items-center">
                    <span className="font-monospace fw-bold">#{order.code}</span>
                    <span className="badge rounded-pill" style={{ backgroundColor: order.status.color, color: '#fff' }}>
                        {order.status.name}
                    </span>
                </div>
                <div className="d-flex gap-1 align-items-center" style={{ height: '28px' }}>
                    {
                        confirmText && onConfirm &&
                        <button className="btn btn-xs btn-primary" onClick={onConfirm}>{confirmText}</button>
                    }
                    {
                        cancelText && onCancel &&
                        <button className="btn btn-xs btn-danger" onClick={onCancel}>{cancelText}</button>
                    }
                </div>
            </div>
            <div >
                <strong className="d-block text-truncate">{order.client.name} {order.client.lastname}</strong>
                {
                    showContact && <>
                        <small className="text-muted d-block text-truncate">Correo: {order.client.email}</small>
                        <small className="text-muted d-block text-truncate">Teléfono: {order.client.phone}</small>
                    </>
                }
            </div>

            <div className="d-flex gap-2 align-items-center">
                <hr className="flex-grow-1 my-2" />
                {showTotal && <span className="fw-semibold">S/ {Number2Currency(order.total_amount)}</span>}
            </div>

            <ul className="list-unstyled mb-0">
                {order.details.map(detail => <li key={detail.id}>
                    <div>{detail.quantity} <i className="mdi mdi-close" /> {detail.item} <small className="text-muted">{detail.presentation}</small></div>
                    {
                        detail.observation && <small className="text-pink d-block ps-2">{detail.observation}</small>
                    }
                </li>)}
            </ul>
        </div>
    </div>
}

export default OrderCard