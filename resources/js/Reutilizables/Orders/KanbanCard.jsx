const KanbanCard = ({ title, length, children }) => {
    return <div className="card h-100">
        <div className="card-header border-bottom">
            <h4 className="header-title my-0">
                <span className="badge bg-secondary me-1">{length}</span>
                {title}
            </h4>
        </div>
        <div className="card-body" style={{ minHeight: 'calc(100vh - 315x)', backgroundColor: '#f7f7f7' }}>
            {children}
        </div>
    </div>
}

export default KanbanCard