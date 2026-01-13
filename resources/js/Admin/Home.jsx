import React, { useState, useMemo, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import BaseAdminto from '../Components/Adminto/Base';
import Chart from 'react-apexcharts';
import HomeRest from '../Actions/HomeRest';

const homeRest = new HomeRest()

const Home = ({ totalRestaurants, totalActiveRestaurants, totalDishes, todayOrders, thisMonthOrders, incomeToday }) => {

  // Estado para el tipo de vista y el rango de fechas
  const [viewType, setViewType] = useState('month'); // 'month', 'year', 'custom'
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [customStart, setCustomStart] = useState(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000));
  const [customEnd, setCustomEnd] = useState(new Date());
  const [salesData, setSalesData] = useState([]);

  const formatIncome = (value) => {
    const numValue = Number(value) || 0;
    return numValue.toFixed(2);
  };

  // Helper to generate full date range
  const generateFullDateRange = (start, end) => {
    const dates = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Helper to generate full month range
  const generateFullMonthRange = (year) => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(year, i));
    }
    return months;
  };

  // Process data to fill gaps with zeros
  const processSalesData = (data, type, start, end) => {
    const dataMap = new Map();
    data.forEach(item => {
      dataMap.set(item.date, { orders: item.orders, amount: item.amount });
    });

    const fullRange = type === 'year'
      ? generateFullMonthRange(start.getFullYear())
      : generateFullDateRange(start, end);

    return fullRange.map(date => {
      const key = type === 'year'
        ? date.toISOString().slice(0, 7) // yyyy-mm
        : date.toISOString().split('T')[0]; // yyyy-mm-dd
      const entry = dataMap.get(key);
      return {
        date: key,
        orders: entry ? entry.orders : 0,
        amount: entry ? entry.amount : 0
      };
    });
  };

  // Fetch real data from API
  useEffect(() => {
    const fetchSalesData = async () => {
      let type, filter;
      let start, end;
      if (viewType === 'month') {
        type = 'monthly';
        filter = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`;
        start = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        end = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
      } else if (viewType === 'year') {
        type = 'yearly';
        filter = selectedYear.getFullYear().toString();
        start = new Date(selectedYear.getFullYear(), 0);
        end = new Date(selectedYear.getFullYear(), 11);
      } else {
        type = 'custom';
        const startStr = customStart.toISOString().split('T')[0];
        const endStr = customEnd.toISOString().split('T')[0];
        filter = `${startStr}|${endStr}`;
        start = new Date(customStart);
        end = new Date(customEnd);
      }

      try {
        const result = await homeRest.graph(type, filter);
        if (result) {
          const apiData = result.map(item => ({
            date: item.label,
            orders: item.count,
            amount: item.amount
          }));
          const filledData = processSalesData(apiData, type, start, end);
          setSalesData(filledData);
        } else {
          const filledData = processSalesData([], type, start, end);
          setSalesData(filledData);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
        const filledData = processSalesData([], type, start, end);
        setSalesData(filledData);
      }
    };

    fetchSalesData();
  }, [viewType, selectedMonth, selectedYear, customStart, customEnd]);

  // Calculate totals from salesData
  const totalOrders = useMemo(() => {
    return salesData.reduce((sum, item) => sum + item.orders, 0);
  }, [salesData]);

  const totalIncome = useMemo(() => {
    return salesData.reduce((sum, item) => sum + item.amount, 0);
  }, [salesData]);

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
                <i className="fas fa-pizza-slice text-muted small"></i>
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
                <i className="fas fa-shopping-cart text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#e0e7ff' }}>
                  <i className="fas fa-shopping-cart text-primary fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{todayOrders} hoy</div>
                  <div className="text-muted small">{totalOrders} <span className="ms-1">en el periodo filtrado</span></div>
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
                <small className="text-muted small">S/</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#d1fae5' }}>
                  <span className="text-success fs-4">S/</span>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">S/ {formatIncome(totalIncome) || '—'}</div>
                  {/* <div className="text-success small fw-semibold"><i className="fas fa-arrow-up me-1"></i>32% <span className="text-muted ms-1">en todo el mes</span></div> */}
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
                {/* Bootstrap 5 Dropdown for view type */}
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-white dropdown-toggle"
                    type="button"
                    id="viewTypeDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {viewType === 'month' ? 'Por Mes (Días)' : viewType === 'year' ? 'Por Año (Meses)' : 'Rango Personalizado'}
                    <i className='mdi mdi-chevron-down ms-1'></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="viewTypeDropdown">
                    <li>
                      <button className="dropdown-item" onClick={(e) => setViewType('month')}>
                        Por Mes (Días)
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={(e) => setViewType('year')}>
                        Por Año (Meses)
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={(e) => setViewType('custom')}>
                        Rango Personalizado
                      </button>
                    </li>
                  </ul>
                </div>

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
                height={420}
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