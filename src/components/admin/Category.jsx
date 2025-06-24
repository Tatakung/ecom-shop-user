import React, { useState, useRef, useEffect, Fragment, use } from "react";
import { createApi, removeApi, editApi } from "../../api/categoryApi";
import useMyStore from "../../global-state/bigdata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const token = useMyStore((state) => state.token);
  const GetCategory = useMyStore((state) => state.actionCategory);
  const Category = useMyStore((state) => state.category);
  const [name, setName] = useState("");
  const [editedName, setEditedName] = useState("");
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false); //เซตค่ากำลังบันทึกข้อมูลลง
  const colors = {
    background: "#f2f2f2",
    cardBackground: "#FFFFFF",
    borderColor: "#e0e0e0",
    headerBackground: "#333333",
    headerText: "#FFFFFF",
    primaryText: "#333333",
    secondaryText: "#555555",
    tableHeaderBg: "#f8f8f8",
    tableHeaderText: "#333333",
    buttonPrimary: "#333333",
    buttonSecondary: "#6c757d",
    buttonDanger: "#dc3545",
    buttonWarning: "#ffc107",
    buttonWarningText: "#333333",
    grayButton: "#6c757d",
    grayButtonHover: "#5a6268",
  };

  useEffect(() => {
    setLoading(true);
    GetCategory();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingCreate(true);
      const res = await createApi(token, { name });
      setName("");
      toast.success(res.data.message);
      const modalElement = modalRef.current;
      if (window.bootstrap && modalElement) {
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      GetCategory();
    } catch (error) {
      console.log(error);
      setName("");
      toast.error(error.response.data.message);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      const resRemove = await removeApi(token, id);
      toast.success(resRemove.data.message);
      GetCategory();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault();
    try {
      const update = await editApi(token, id, { name: editedName });
      toast.success(update.data.message);
      GetCategory();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      className="container py-4"
      style={{ backgroundColor: colors.background, minHeight: "100vh" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div
        className="card shadow-sm mb-4"
        style={{ backgroundColor: "#A53860" }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 className="mb-0 fw-bold" style={{ color: "#FFFF" }}>
            จัดการประเภทชุด
          </h3>
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#FFFF",
              // color: ,
              // borderColor: colors.buttonPrimary,
              fontWeight: "bold",
              transition: "background-color 0.2s, border-color 0.2s",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-plus-lg me-2"></i> เพิ่มประเภทชุด
          </button>
        </div>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#333333" }}
          >
            
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="ms-3 text-muted">กำลังโหลดประเภทชุด...</p>
        </div>
      ) : (
        <>
          <div
            className="card shadow-sm"
            style={{
              backgroundColor: colors.cardBackground,
              border: `1px solid ${colors.borderColor}`,
            }}
          >
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{
                          backgroundColor: colors.tableHeaderBg,
                          color: colors.tableHeaderText,
                          borderBottom: `2px solid ${colors.borderColor}`,
                        }}
                      >
                        ลำดับ
                      </th>
                      <th
                        scope="col"
                        style={{
                          backgroundColor: colors.tableHeaderBg,
                          color: colors.tableHeaderText,
                          borderBottom: `2px solid ${colors.borderColor}`,
                        }}
                      >
                        ประเภทชุด
                      </th>
                      <th
                        scope="col"
                        style={{
                          backgroundColor: colors.tableHeaderBg,
                          color: colors.tableHeaderText,
                          borderBottom: `2px solid ${colors.borderColor}`,
                        }}
                      >
                        การจัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Category.length > 0 ? (
                      Category.map((element, index) => (
                        <tr
                          key={element.id || index}
                          style={{
                            borderBottom: `1px solid ${colors.borderColor}`,
                          }}
                        >
                          <th scope="row" style={{ color: colors.primaryText }}>
                            {index + 1}
                          </th>
                          <td style={{ color: colors.primaryText }}>
                            {element.name}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm me-2"
                              style={{
                                backgroundColor: "#A53860", // ✅ เปลี่ยนเป็นสีเทา
                                color: colors.headerText, // ข้อความเป็นสีขาวตัดกับสีเทา
                                borderColor: "#A53860",
                                fontWeight: "bold",
                                transition:
                                  "background-color 0.2s, border-color 0.2s",
                              }}
                              data-bs-toggle="modal"
                              data-bs-target={`#edit${element.id}`}
                              onClick={() => setEditedName(element.name)}
                            >
                              <i className="bi bi-pencil-square"></i> แก้ไข
                            </button>
                            {/* <button
                              type="button"
                              className="btn btn-sm"
                              style={{
                                backgroundColor: "#AC1754",
                                fontWeight: "bold",
                                transition:
                                  "background-color 0.2s, border-color 0.2s",
                              }}
                              data-bs-toggle="modal"
                              data-bs-target={`#remove${element.id}`}
                            >
                              <i className="bi bi-trash"></i> ลบ
                            </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center text-muted py-4"
                          style={{ color: colors.secondaryText }}
                        >
                          ไม่มีข้อมูลประเภทชุด
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {Category.map((element, index) => (
            <Fragment key={element.id || index}>
              {/* Remove Modal */}
              <div
                className="modal fade"
                id={`remove${element.id}`}
                tabIndex="-1"
                aria-labelledby={`removeLabel${element.id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content rounded-3 shadow">
                    <div
                      className="modal-header"
                      style={{
                        backgroundColor: "#A53860",
                        color: colors.headerText,
                      }}
                    >
                      <h5
                        className="modal-title fs-5 fw-bold"
                        id={`removeLabel${element.id}`}
                      >
                        ยืนยันการลบประเภทชุด
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        style={{ filter: "invert(1)" }}
                      ></button>
                    </div>
                    <div
                      className="modal-body p-4 text-center"
                      style={{ color: colors.primaryText }}
                    >
                      <p className="mb-2">
                        คุณต้องการลบประเภทชุด
                        <strong style={{ color: colors.buttonDanger }}>
                          {" "}
                          {element.name}{" "}
                        </strong>
                        หรือไม่?
                      </p>
                      <small
                        className="text-muted"
                        style={{ color: colors.secondaryText }}
                      >
                        การดำเนินการนี้ไม่สามารถย้อนกลับได้
                      </small>
                    </div>
                    <div
                      className="modal-footer justify-content-center border-top"
                      style={{ borderTopColor: colors.borderColor }}
                    >
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        data-bs-dismiss="modal"
                        style={{
                          backgroundColor: colors.buttonSecondary,
                          color: colors.headerText,
                          borderColor: colors.buttonSecondary,
                          transition:
                            "background-color 0.2s, border-color 0.2s",
                        }}
                        onMouseOver={(e) => (
                          (e.target.style.backgroundColor = "#5a6268"),
                          (e.target.style.borderColor = "#545b62")
                        )}
                        onMouseOut={(e) => (
                          (e.target.style.backgroundColor =
                            colors.buttonSecondary),
                          (e.target.style.borderColor = colors.buttonSecondary)
                        )}
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={() => handleRemove(element.id)}
                        style={{
                          backgroundColor: "#A53860", // ✅ ปุ่มยืนยันการลบเป็นสีเทา
                          color: colors.headerText,
                          transition:
                            "background-color 0.2s, border-color 0.2s",
                        }}
                      >
                        ยืนยันการลบ
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Modal */}
              <div
                className="modal fade"
                id={`edit${element.id}`}
                tabIndex="-1"
                aria-labelledby={`editLabel${element.id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content rounded-3 shadow">
                    <form onSubmit={(e) => handleSubmitEdit(e, element.id)}>
                      <div
                        className="modal-header"
                        style={{
                          backgroundColor: "#A53860",
                          color: colors.headerText,
                        }}
                      >
                        <h5
                          className="modal-title fs-5 fw-bold"
                          id={`editLabel${element.id}`}
                        >
                          แก้ไขประเภทชุด
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          style={{ filter: "invert(1)" }}
                        ></button>
                      </div>
                      <div
                        className="modal-body p-4"
                        style={{ color: colors.primaryText }}
                      >
                        <div className="mb-3">
                          <label
                            htmlFor={`editInput${element.id}`}
                            className="form-label fw-semibold"
                          >
                            ชื่อประเภทชุด:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`editInput${element.id}`}
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            style={{
                              border: `1px solid ${colors.borderColor}`,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="modal-footer justify-content-center border-top"
                        style={{ borderTopColor: colors.borderColor }}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          data-bs-dismiss="modal"
                          onClick={() => setEditedName("")} 
                          style={{
                            backgroundColor: colors.buttonSecondary,
                            color: colors.headerText,
                            borderColor: colors.buttonSecondary,
                            transition:
                              "background-color 0.2s, border-color 0.2s",
                          }}
                        >
                          ยกเลิก
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          style={{
                            backgroundColor: "#A53860",
                            color: colors.headerText,
                            borderColor: "#A53860",
                            fontWeight: "bold",
                            transition:
                              "background-color 0.2s, border-color 0.2s",
                          }}
                        >
                          บันทึก
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            ref={modalRef}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-3 shadow">
                <form onSubmit={handleSubmit}>
                  <div
                    className="modal-header"
                    style={{ backgroundColor: "#A53860", color: "#FFFFFF" }}
                  >
                    <h5
                      className="modal-title fs-5 fw-bold"
                      id="exampleModalLabel"
                    >
                      เพิ่มประเภทชุดใหม่
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      style={{ filter: "invert(1)" }}
                    ></button>
                  </div>
                  <div
                    className="modal-body p-4"
                    style={{ color: colors.primaryText }}
                  >
                    <div className="mb-3">
                      <label
                        htmlFor="categoryNameInput"
                        className="form-label fw-semibold"
                      >
                        ชื่อประเภทชุด:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="categoryNameInput"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="ป้อนชื่อประเภทชุด"
                        style={{ border: `1px solid ${colors.borderColor}` }}
                        required
                      />
                    </div>
                  </div>
                  <div
                    className="modal-footer justify-content-center border-top"
                    style={{ borderTopColor: colors.borderColor }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      data-bs-dismiss="modal"
                      style={{
                        backgroundColor: colors.buttonSecondary,
                        color: colors.headerText,
                        borderColor: colors.buttonSecondary,
                        transition: "background-color 0.2s, border-color 0.2s",
                      }}
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loadingCreate}
                      style={{
                        backgroundColor: "#A53860",
                        color: colors.headerText,
                        borderColor: "#A53860",
                        fontWeight: "bold",
                        transition: "background-color 0.2s, border-color 0.2s",
                      }}
                    >
                      {loadingCreate ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                            style={{ color: "#FFFFFF" }}
                          ></span>
                          กำลังบันทึก...
                        </>
                      ) : (
                        <>บันทึก</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
