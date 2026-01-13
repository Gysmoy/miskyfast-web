import React, { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import BaseAdminto from '../Components/Adminto/Base';
import Chart from 'react-apexcharts';

const Home = ({ totalRestaurants, totalActiveRestaurants, totalDishes, todayOrders, thisMonthOrders, incomeToday }) => {

  // Estado para el tipo de vista y el rango de fechas
  const [viewType, setViewType] = useState('month'); // 'month', 'year', 'custom'
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [customStart, setCustomStart] = useState(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000));
  const [customEnd, setCustomEnd] = useState(new Date());

  const formatIncome = (value) => {
    const numValue = Number(value) || 0;
    return numValue.toFixed(2);
  };

  // Generar datos ficticios de ventas según el tipo de vista
  const salesData = useMemo(() => {
    const data = [];
    if (viewType === 'month') {
      const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        data.push({
          date: `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
          orders: Math.floor(Math.random() * 50) + 20,
          amount: Math.floor(Math.random() * 5000) + 1500
        });
      }
    } else if (viewType === 'year') {
      for (let m = 0; m < 12; m++) {
        data.push({
          date: `${selectedYear.getFullYear()}-${String(m + 1).padStart(2, '0')}-01`,
          orders: Math.floor(Math.random() * 1500) + 500,
          amount: Math.floor(Math.random() * 150000) + 50000
        });
      }
    } else {
      // Rango personalizado
      const start = new Date(customStart);
      const end = new Date(customEnd);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        data.push({
          date: d.toISOString().split('T')[0],
          orders: Math.floor(Math.random() * 50) + 20,
          amount: Math.floor(Math.random() * 5000) + 1500
        });
      }
    }
    return data;
  }, [viewType, selectedMonth, selectedYear, customStart, customEnd]);

  return (
    <>
      {/* KPIs Modernos */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Restaurantes Registrados</span>
                <i className="fas fa-utensils text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#e0e7ff' }}>
                  <i className="fas fa-store text-primary fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{totalRestaurants}</div>
                  <div className="text-muted small">{totalActiveRestaurants} activos en la plataforma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Platos Totales</span>
                <i className="fas fa-ellipsis-v text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#d1fae5' }}>
                  <i className="fas fa-pizza-slice text-success fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{totalDishes}</div>
                  <div className="text-muted small">Disponibles para pedir</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Pedidos Totales</span>
                <i className="fas fa-ellipsis-v text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#e0e7ff' }}>
                  <i className="fas fa-shopping-cart text-primary fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{todayOrders || '—'}</div>
                  <div className="text-muted small">{thisMonthOrders || '—'} <span className="ms-1">Desde el mes pasado</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Ingresos Totales</span>
                <i className="fas fa-ellipsis-v text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#d1fae5' }}>
                  <i className="fas fa-dollar-sign text-success fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">S/ {formatIncome(incomeToday) || '—'}</div>
                  <div className="text-success small fw-semibold"><i className="fas fa-arrow-up me-1"></i>32% <span className="text-muted ms-1">Desde el mes pasado</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas de Ventas con Filtros */}
      <div className="row g-3 mb-4">
        <div className="col-xl-12">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-chart-bar text-info"></i>
                <span className="fw-bold">Ventas a través de la App</span>
              </div>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" value={viewType} onChange={(e) => setViewType(e.target.value)} style={{ width: 'auto' }}>
                  <option value="month">Por Mes (Días)</option>
                  <option value="year">Por Año (Meses)</option>
                  <option value="custom">Rango Personalizado</option>
                </select>
                {viewType === 'month' && (
                  <DatePicker
                    selected={selectedMonth}
                    onChange={date => setSelectedMonth(date)}
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    className="form-control form-control-sm"
                  />
                )}
                {viewType === 'year' && (
                  <DatePicker
                    selected={selectedYear}
                    onChange={date => setSelectedYear(date)}
                    dateFormat="yyyy"
                    showYearPicker
                    className="form-control form-control-sm"
                  />
                )}
                {viewType === 'custom' && (
                  <>
                    <DatePicker
                      selected={customStart}
                      onChange={date => setCustomStart(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control form-control-sm"
                      maxDate={customEnd}
                    />
                    <span className="mx-1">a</span>
                    <DatePicker
                      selected={customEnd}
                      onChange={date => setCustomEnd(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control form-control-sm"
                      minDate={customStart}
                      maxDate={new Date()}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="card-body">
              <Chart
                options={{
                  chart: {
                    id: 'salesChart',
                    toolbar: { show: false },
                    stacked: false,
                  },
                  xaxis: {
                    categories: salesData.map(d => d.date),
                    labels: { rotate: viewType === 'month' ? -35 : 0 }
                  },
                  yaxis: [
                    {
                      title: { text: 'Pedidos' },
                      labels: { style: { colors: '#3b82f6' } },
                      min: 0,
                    },
                    {
                      opposite: true,
                      title: { text: 'Ventas (S/)' },
                      labels: { style: { colors: '#10b981' } },
                      min: 0,
                    }
                  ],
                  dataLabels: { enabled: false },
                  stroke: { curve: 'smooth', width: [0, 3] },
                  colors: ['#3b82f6', '#10b981'],
                  tooltip: {
                    enabled: true,
                    shared: true,
                    intersect: false,
                    y: [
                      {
                        formatter: val => `${val} pedidos`
                      },
                      {
                        formatter: val => `S/ ${Number(val).toFixed(2)}`
                      }
                    ]
                  },
                  legend: { show: true, position: 'top', fontWeight: 600 }
                }}
                series={[
                  {
                    name: 'Pedidos',
                    type: 'column',
                    data: salesData.map(d => d.orders),
                    yAxisIndex: 0
                  },
                  {
                    name: 'Ventas',
                    type: 'line',
                    data: salesData.map(d => d.amount),
                    yAxisIndex: 1
                  }
                ]}
                type="line"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Dashboard'>
    <Home {...properties} />
  </BaseAdminto>);
})