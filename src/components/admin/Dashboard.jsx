import React, { useEffect, useState } from "react";
import useMyStore from "../../global-state/bigdata";
import { show } from "../../api/auth";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const token = useMyStore((state) => state.token);
  const [incomedd, setIncomedd] = useState(0);
  const [j, setJ] = useState(); // สำหรับสินค้าขายดี
  const [success, setSuccess] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // ต้อง +1 เพราะ getMonth() เริ่มที่ 0
  const [year, setYear] = useState(new Date().getFullYear());
  const [count_fail, setcount_fail] = useState(0);
  const [map, setMap] = useState(); // สำหรับ PieChart

  // กำหนดสีสำหรับ Pie Chart และข้อความตามธีม
  const pieChartColors = ["#A53860", "#F7A8C4", "#28a745", "#ffc107", "#dc3545", "#6f42c1", "#fd7e14"]; // ตัวอย่างสี
  const textColor = "#212529"; // text-dark

  const getData = async (token, selectedMonth, selectedYear) => {
    try {
      const res = await show(token, selectedMonth, selectedYear);
      setIncomedd(res.data.total);
      setJ(res.data.s);
      setcount_fail(res.data.count_fail);
      setSuccess(res.data.count_success);
      setMap(res.data.list);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // อาจจะแสดง toast error here
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
  }, []); // Run once on component mount

  // สร้าง list ของปีสำหรับ dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // ย้อนหลัง 5 ปีจากปัจจุบัน

  return (
    <div className="container py-4"> {/* เพิ่ม padding บน-ล่าง */}
      <h2 className="mb-4 text-center fw-bold text-dark">ภาพรวมแดชบอร์ด</h2>

      {/* Filter Section */}
      <div className="row mb-4 g-3 align-items-center justify-content-center">
        <div className="col-md-3 col-sm-6">
          <label htmlFor="monthSelect" className="form-label visually-hidden">เลือกเดือน</label>
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
          <label htmlFor="yearSelect" className="form-label visually-hidden">เลือกปี</label>
          <select
            id="yearSelect"
            className="form-select shadow-sm" // ใช้ form-select ของ Bootstrap
            value={year}
            onChange={handleYearChange}
          >
            <option value="0">ทุกปี</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y + 543} {/* แปลงเป็นปี พ.ศ. */}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="row mb-4 g-3"> {/* g-3 สำหรับ gap ระหว่าง col */}
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 shadow-sm border-0"> {/* h-100 ให้ card สูงเท่ากัน */}
            <div className="card-body">
              <p className="card-title fw-bold mb-1 text-muted">รายรับรวม</p>
              <h4 className="card-text text-success fw-bold">{incomedd.toLocaleString()} บาท</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <p className="card-title fw-bold mb-1 text-muted">คำสั่งซื้อ (ชำระแล้ว)</p>
              <h4 className="card-text text-primary fw-bold">{success} รายการ</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <p className="card-title fw-bold mb-1 text-muted">คำสั่งซื้อ (ยังไม่ชำระเงิน)</p>
              <h4 className="card-text text-warning fw-bold">{count_fail} รายการ</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables Section */}
      <div className="row g-4"> {/* g-4 สำหรับ gap ระหว่าง col ที่มากขึ้น */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3 fw-bold text-dark">สินค้าขายดี</h5>
              {j && j.length > 0 ? (
                <div className="table-responsive"> {/* ทำให้ตาราง scroll ได้บนจอเล็ก */}
                  <table className="table table-hover table-striped mb-0"> {/* เพิ่ม table-hover, table-striped */}
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
                        <tr key={element.Name || index}> {/* ใช้ Name เป็น key หรือ index เป็น fallback */}
                          <th scope="row">{index + 1}</th>
                          <td>
                            {element.url ? (
                              <img
                                src={element.url}
                                alt={element.Name}
                                className="img-fluid rounded" // ใช้ img-fluid และ rounded
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                              />
                            ) : (
                              <div style={{ width: "60px", height: "60px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
                                <span className="text-muted small">ไม่มีรูป</span>
                              </div>
                            )}
                          </td>
                          <td className="align-middle">{element.Name}</td>
                          <td className="align-middle">{element.total}</td>
                          <td className="align-middle">{element.price?.toLocaleString()}</td>
                          <td className="align-middle">{element.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center py-4">ไม่มีข้อมูลสินค้าขายดีสำหรับช่วงเวลานี้</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column align-items-center justify-content-center"> {/* จัด chart ให้อยู่กึ่งกลาง */}
              <h5 className="card-title mb-3 fw-bold text-dark">ยอดขายตามประเภทชุด</h5>
              {Array.isArray(map) && map.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: map.map((item, index) => ({
                        ...item,
                        color: pieChartColors[index % pieChartColors.length], // วนใช้สี
                      })),
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      outerRadius: 100, // ปรับขนาดวงกลม
                      innerRadius: 40,
                      paddingAngle: 3, // เพิ่มระยะห่างระหว่าง slice
                      cornerRadius: 5, // เพิ่มมุมโค้งมน
                    },
                  ]}
                  width={350} // ปรับความกว้างให้เหมาะสม
                  height={300}
                  slotProps={{
                    legend: {
                        direction: 'row', // จัด legend เป็นแนวนอน
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: { top: 20 },
                        labelStyle: {
                          fontSize: 12,
                          fill: textColor, // สีข้อความ legend
                        },
                      },
                  }}
                />
              ) : (
                <p className="text-muted text-center py-4">ไม่มีข้อมูลยอดขายตามประเภทชุดสำหรับช่วงเวลานี้</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;