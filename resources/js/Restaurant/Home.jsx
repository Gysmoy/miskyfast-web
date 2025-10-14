import React, { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import BaseAdminto from '../Components/Adminto/Base';
import Chart from 'react-apexcharts';

const Home = ({ salesToday, salesMonth, incomeToday, topProducts, newFeatured, ordersByStatus, salesByLocation, topCoupons, topDiscountRules, brands, topClients }) => {
  // Dummy data for restaurants and dishes
  const dummyRestaurants = 42;
  const dummyDishes = 312;

  // State for view type and date range
  const [viewType, setViewType] = useState('month'); // 'month', 'year', 'custom'
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [customStart, setCustomStart] = useState(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000));
  const [customEnd, setCustomEnd] = useState(new Date());

  const formatIncome = (value) => {
    const numValue = Number(value) || 0;
    return numValue.toFixed(2);
  };

  // Generate dummy sales data based on view type
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
      // Custom range
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
                <span className="text-muted fw-semibold">Restaurants Registered</span>
                <i className="fas fa-utensils text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#e0e7ff' }}>
                  <i className="fas fa-store text-primary fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{dummyRestaurants}</div>
                  <div className="text-muted small">Active on platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Total Dishes</span>
                <i className="fas fa-ellipsis-v text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#d1fae5' }}>
                  <i className="fas fa-pizza-slice text-success fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{dummyDishes}</div>
                  <div className="text-muted small">Available for order</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Total Orders</span>
                <i className="fas fa-ellipsis-v text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#e0e7ff' }}>
                  <i className="fas fa-shopping-cart text-primary fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">{salesToday || '—'}</div>
                  <div className="text-muted small">{salesMonth || '—'} <span className="ms-1">Since last month</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fw-semibold">Total Revenue</span>
                <i className="fas fa-ellipsis-v text-muted small"></i>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: '#d1fae5' }}>
                  <i className="fas fa-dollar-sign text-success fs-4"></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">S/ {formatIncome(incomeToday) || '—'}</div>
                  <div className="text-success small fw-semibold"><i className="fas fa-arrow-up me-1"></i>32% <span className="text-muted ms-1">Since last month</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Statistics with Filters */}
      <div className="row g-3 mb-4">
        <div className="col-xl-12">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-chart-bar text-info"></i>
                <span className="fw-bold">Sales Through App</span>
              </div>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" value={viewType} onChange={(e) => setViewType(e.target.value)} style={{ width: 'auto' }}>
                  <option value="month">By Month (Days)</option>
                  <option value="year">By Year (Months)</option>
                  <option value="custom">Custom Range</option>
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
                    <span className="mx-1">to</span>
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
                      title: { text: 'Orders' },
                      labels: { style: { colors: '#3b82f6' } },
                      min: 0,
                    },
                    {
                      opposite: true,
                      title: { text: 'Sales (S/)' },
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
                        formatter: val => `${val} orders`
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
                    name: 'Orders',
                    type: 'column',
                    data: salesData.map(d => d.orders),
                    yAxisIndex: 0
                  },
                  {
                    name: 'Sales',
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

      {/* Existing charts and tables continue below */}
      <div className="row g-3 mb-4">
        <div className="col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-chart-pie text-primary"></i>
                <span className="fw-bold">Orders Statistics</span>
              </div>
              <button className="btn btn-sm btn-light border"><i className="fas fa-sync-alt"></i></button>
            </div>
            <div className="card-body">
              <Chart
                options={{
                  chart: {
                    type: 'pie',
                    toolbar: { show: false },
                  },
                  labels: ordersByStatus?.map(s => s.name),
                  colors: ordersByStatus?.map(s => s.color),
                  legend: {
                    position: 'bottom',
                    fontSize: '15px',
                    fontWeight: 500,
                    markers: { width: 16, height: 16, radius: 8 },
                    itemMargin: { horizontal: 10, vertical: 4 }
                  },
                  tooltip: {
                    enabled: true,
                    style: { fontSize: '15px', fontWeight: 500 },
                    fillSeriesColor: false,
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: { width: 2, colors: ['#fff'] },
                  fill: {
                    type: 'solid',
                  },
                  states: {
                    hover: { filter: { type: 'lighten', value: 0.08 } },
                    active: { filter: { type: 'darken', value: 0.12 } }
                  },
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 700,
                    animateGradually: { enabled: true, delay: 100 },
                    dynamicAnimation: { enabled: true, speed: 300 }
                  }
                }}
                series={ordersByStatus?.map(s => s.count)}
                type="pie"
                height={300}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-th-large text-success"></i>
                <span className="fw-bold">Sales by Location (TreeMap)</span>
              </div>
              <button className="btn btn-sm btn-light border"><i className="fas fa-ellipsis-v"></i></button>
            </div>
            <div className="card-body">
              <Chart
                options={{
                  chart: { type: 'treemap', toolbar: { show: false } },
                  legend: { show: false },
                  dataLabels: {
                    enabled: true,
                    style: { fontSize: '14px', fontWeight: 500 },
                    formatter: function (text, op) {
                      return text.length > 18 ? text.slice(0, 15) + '...' : text;
                    }
                  },
                  colors: ['#10b981', '#3b82f6', '#f59e42', '#f43f5e', '#6366f1', '#06b6d4', '#fbbf24'],
                  tooltip: {
                    enabled: true,
                    y: {
                      formatter: val => `Sales: ${val}`
                    }
                  },
                  grid: { show: false }
                }}
                series={[
                  {
                    data: salesByLocation?.slice(0, 12).map(l => ({
                      x: `${l.department}/${l.province}/${l.district}`,
                      y: l.count
                    }))
                  }
                ]}
                type="treemap"
                height={300}
              />
              <div className="text-muted small mt-2">
                Showing top {Math.min(salesByLocation?.length || 0, 12)} locations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listados y tablas principales mejoradas */}
      <div className="row mb-3">
        <div className="col-xl-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="me-2"><i className="fas fa-fire text-danger"></i></span>
                <h6 className="mb-0 fw-bold">Top Selling Products</h6>
              </div>
              <button className="btn btn-sm btn-outline-primary"><i className="fas fa-download"></i> Export</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: 340 }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts?.map((product) => (
                      <tr key={product.name}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={`/storage/images/item/${product.image}`} alt={product.name} className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #e5e7eb' }} onError={e => e.target.src = '/api/cover/thumbnail/null'} />
                            <div>
                              <div className="fw-semibold">{product.name}</div>
                              <span className="badge bg-primary bg-opacity-10 text-primary mt-1">Top</span>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-success bg-opacity-10 text-success fs-6">{product.quantity}</span></td>
                        <td>
                          <span className="badge bg-success bg-opacity-10 text-success"><i className="fas fa-arrow-up me-1"></i>+{Math.round(Math.random() * 20)}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <span className="text-muted small">Showing {topProducts?.length || 0} products</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="me-2"><i className="fas fa-star text-warning"></i></span>
                <h6 className="mb-0 fw-bold">New Featured Products</h6>
              </div>
              <button className="btn btn-sm btn-outline-primary"><i className="fas fa-upload"></i> Import</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: 340 }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFeatured?.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={`/storage/images/item/${product.image}`} alt={product.name} className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #e5e7eb' }} />
                            <div>
                              <div className="fw-semibold">{product.name}</div>
                              <span className="badge bg-warning bg-opacity-10 text-warning mt-1">New</span>
                            </div>
                          </div>
                        </td>
                        <td className="fw-bold">S/{Number(product.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <span className="text-muted small">Showing {newFeatured?.length || 0} products</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="me-2"><i className="fas fa-ticket-alt text-primary"></i></span>
                <h6 className="mb-0 fw-bold">Most Used Coupons</h6>
              </div>
              <button className="btn btn-sm btn-outline-primary"><i className="fas fa-download"></i> Export</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: 340 }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Times Used</th>
                      <th>Value</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCoupons?.map((c, i) => (
                      <tr key={i}>
                        <td><span className="badge bg-primary bg-opacity-10 text-primary">{c.code}</span></td>
                        <td className="fw-semibold">{c.name}</td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">{c.used_count}</span></td>
                        <td><span className="badge bg-info bg-opacity-10 text-info">{c.value}</span></td>
                        <td><span className="badge bg-secondary bg-opacity-10 text-secondary">{c.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <span className="text-muted small">Showing {topCoupons?.length || 0} coupons</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="me-2"><i className="fas fa-percentage text-success"></i></span>
                <h6 className="mb-0 fw-bold">Most Used Discount Rules</h6>
              </div>
              <button className="btn btn-sm btn-outline-primary"><i className="fas fa-download"></i> Export</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: 340 }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Times Applied</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDiscountRules?.map((r, i) => (
                      <tr key={i}>
                        <td className="fw-semibold">{r.name}</td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">{r.times_used}</span></td>
                        <td><span className="badge bg-info bg-opacity-10 text-info">S/ {formatIncome(r.total_discount)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <span className="text-muted small">Showing {topDiscountRules?.length || 0} rules</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="me-2"><i className="fas fa-industry text-info"></i></span>
                <h6 className="mb-0 fw-bold">Brands Listing</h6>
              </div>
              <button className="btn btn-sm btn-outline-primary"><i className="fas fa-plus"></i> Add Brand</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: 340 }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Visible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands?.map((b, i) => (
                      <tr key={i}>
                        <td className="fw-semibold">{b.name}</td>
                        <td>
                          <span className={`badge ${b.status === 1 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>{b.status === 1 ? 'Active' : 'Inactive'}</span>
                        </td>
                        <td>
                          <span className={`badge ${b.featured ? 'bg-warning bg-opacity-10 text-warning' : 'bg-secondary bg-opacity-10 text-secondary'}`}>{b.featured ? 'Yes' : 'No'}</span>
                        </td>
                        <td>
                          <span className={`badge ${b.visible ? 'bg-primary bg-opacity-10 text-primary' : 'bg-secondary bg-opacity-10 text-secondary'}`}>{b.visible ? 'Yes' : 'No'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <span className="text-muted small">Showing {brands?.length || 0} brands</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="me-2"><i className="fas fa-users text-primary"></i></span>
                <h6 className="mb-0 fw-bold">Top Clients</h6>
              </div>
              <button className="btn btn-sm btn-outline-primary"><i className="fas fa-download"></i> Export</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: 340 }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Email</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClients?.map((c, i) => (
                      <tr key={i}>
                        <td className="fw-semibold">{c.email}</td>
                        <td><span className="badge bg-primary bg-opacity-10 text-primary">{c.total_orders}</span></td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">S/ {formatIncome(c.total_spent)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center p-2">
                <span className="text-muted small">Showing {topClients?.length || 0} clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <BaseAdminto {...properties} title="Dashboard">
      <Home {...properties} />
    </BaseAdminto>
  );
});