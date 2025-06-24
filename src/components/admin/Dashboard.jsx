import React, { useEffect, useState } from "react";
import useMyStore from "../../global-state/bigdata";
import { show } from "../../api/auth";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const token = useMyStore((state) => state.token);
  const [incomedd, setIncomedd] = useState(0);
  const [j, setJ] = useState(); // สำหรับสินค้าขายดี
  const [success, setSuccess] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [count_fail, setcount_fail] = useState(0);
  const [map, setMap] = useState();
  const [loading, setLoading] = useState(true);
  const pieChartColors = [
    "#A53860",
    "#F7A8C4",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#fd7e14",
  ];
  const textColor = "#212529";
  const getData = async (token, selectedMonth, selectedYear) => {
    try {
      setLoading(true);
      const res = await show(token, selectedMonth, selectedYear);
      setIncomedd(res.data.total);
      setJ(res.data.s);
      setcount_fail(res.data.count_fail);
      setSuccess(res.data.count_success);
      setMap(res.data.list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    getData(token, newMonth, year);
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    getData(token, month, newYear);
  };

  useEffect(() => {
    getData(token, month, year);
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold text-dark">ภาพรวมแดชบอร์ด</h2>
      {/* Filter Section */}
      <div className="row mb-4 g-3 align-items-center justify-content-center">
        <div className="col-md-3 col-sm-6">
          <label htmlFor="monthSelect" className="form-label visually-hidden">
            เลือกเดือน
          </label>
          <select
            id="monthSelect"
            className="form-select shadow-sm" // ใช้ form-select ของ Bootstrap
            value={month}
            onChange={handleMonthChange}
          >
            <option value="0">ทุกเดือน</option>
            <option value="1">มกราคม</option>
            <option value="2">กุมภาพันธ์</option>
            <option value="3">มีนาคม</option>
            <option value="4">เมษายน</option>
            <option value="5">พฤษภาคม</option>
            <option value="6">มิถุนายน</option>
            <option value="7">กรกฎาคม</option>
            <option value="8">สิงหาคม</option>
            <option value="9">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤศจิกายน</option>
            <option value="12">ธันวาคม</option>
          </select>
        </div>
        <div className="col-md-3 col-sm-6">
          <label htmlFor="yearSelect" className="form-label visually-hidden">
            เลือกปี
          </label>
          <select
            id="yearSelect"
            className="form-select shadow-sm" 
            value={year}
            onChange={handleYearChange}
          >
            <option value="0">ทุกปี</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y + 543} 
              </option>
            ))}
          </select>
        </div>
      </div>


      {
        loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#333333" }}
          >
            {" "}
            
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="ms-3 text-muted">กำลังโหลด...</p>
        </div>
      ) : <>
     
          
      <div className="row mb-4 g-3">
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <p className="card-title fw-bold mb-1 text-muted">รายรับรวม</p>
              <h4 className="card-text text-success fw-bold">
                {incomedd.toLocaleString()} บาท
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <p className="card-title fw-bold mb-1 text-muted">
                คำสั่งซื้อ (ชำระแล้ว)
              </p>
              <h4 className="card-text text-primary fw-bold">
                {success} รายการ
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <p className="card-title fw-bold mb-1 text-muted">
                คำสั่งซื้อ (ยังไม่ชำระเงิน)
              </p>
              <h4 className="card-text text-warning fw-bold">
                {count_fail} รายการ
              </h4>
            </div>
          </div>
        </div>
      </div>
    
      <div className="row g-4">
       
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3 fw-bold text-dark">สินค้าขายดี</h5>
              {j && j.length > 0 ? (
                <div className="table-responsive">
                
                  <table className="table table-hover table-striped mb-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">รูปภาพ</th>
                        <th scope="col">ชื่อสินค้า</th>
                        <th scope="col">ยอดขาย (ชิ้น)</th>
                        <th scope="col">ราคา (บาท)</th>
                        <th scope="col">คงเหลือ (ชิ้น)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {j.map((element, index) => (
                        <tr key={element.Name || index}>
                          {" "}
                          <th scope="row">{index + 1}</th>
                          <td>
                            {element.url ? (
                              <img
                                src={element.url}
                                alt={element.Name}
                                className="img-fluid rounded" 
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  backgroundColor: "#f0f0f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "8px",
                                }}
                              >
                                <span className="text-muted small">
                                  ไม่มีรูป
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="align-middle">{element.Name}</td>
                          <td className="align-middle">{element.total}</td>
                          <td className="align-middle">
                            {element.price?.toLocaleString()}
                          </td>
                          <td className="align-middle">{element.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center py-4">
                  ไม่มีข้อมูลสินค้าขายดีสำหรับช่วงเวลานี้
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              {" "}
              {/* จัด chart ให้อยู่กึ่งกลาง */}
              <h5 className="card-title mb-3 fw-bold text-dark">
                ยอดขายตามประเภทชุด
              </h5>
              {Array.isArray(map) && map.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: map.map((item, index) => ({
                        ...item,
                        color: pieChartColors[index % pieChartColors.length], // วนใช้สี
                      })),
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                      outerRadius: 100, 
                      innerRadius: 40,
                      paddingAngle: 3, 
                      cornerRadius: 5, 
                    },
                  ]}
                  width={350} 
                  height={300}
                  slotProps={{
                    legend: {
                      direction: "row", 
                      position: { vertical: "bottom", horizontal: "middle" },
                      padding: { top: 20 },
                      labelStyle: {
                        fontSize: 12,
                        fill: textColor, 
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-muted text-center py-4">
                  ไม่มีข้อมูลยอดขายตามประเภทชุดสำหรับช่วงเวลานี้
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
       </>
      }
    </div>
  );
};

export default Dashboard;
