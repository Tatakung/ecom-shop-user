// PdfDocument.js
import act, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Register font
Font.register({ family: "test", src: "/fonts/joy.ttf" });

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "test",
    padding: 10,
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    padding: 20,
    flexDirection: "row", // ทำให้เป็นแถวเดียวกัน
    marginBottom: 10,
  },
  col: {
    flex: 1, // กินพื้นที่เท่ากัน (50% + 50%)
  },

  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingVertical: 5,
  },
  tableCol: {
    flex: 1,
    paddingHorizontal: 5,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

const PdfComponents = ({ cart }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>ใบเสร็จรับเงิน #{cart.id} </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>ร้านค้า</Text>
          <Text>ร้านเปลือกไหม</Text>
          <Text>
            เลขที่ 47 หมู่ที่ 3 ตำบลตะโละกาโปร์ อำเภอยะหริ่ง จังหวัดปัตตานี
            94150
          </Text>
          <Text>เบอร์ติดต่อ 081-234-5678</Text>
        </View>
        <View style={styles.col}>
          <Text>ข้อมูลลูกค้า</Text>
          <Text>
            {cart.orderedBy.name}
            {cart.orderedBy.lname}
          </Text>
          <Text>ที่อยู่จัดส่ง : {cart.orderedBy.address}</Text>
          <Text>เบอร์ติดต่อ : {cart.orderedBy.phone} </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCol, styles.tableHeader]}>รายการสินค้า</Text>
        <Text style={[styles.tableCol, styles.tableHeader]}>จำนวน</Text>
        <Text style={[styles.tableCol, styles.tableHeader]}>ราคาต่อหน่วย</Text>
        <Text style={[styles.tableCol, styles.tableHeader]}>จำนวนเงิน</Text>
      </View>

      {cart.products.map((element, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCol}>{element.product.title}</Text>
          <Text style={styles.tableCol}>{element.count}</Text>
          <Text style={styles.tableCol}>{element.price}</Text>
          <Text style={styles.tableCol}>{element.price * element.count}</Text>
        </View>
      ))}
      <View style={{ textAlign: "right", marginTop: 20 }}>
        <Text>รวมสินค้า: 590 บาท</Text>
        <Text>ค่าจัดส่ง: 30 บาท</Text>
        <Text style={{ fontWeight: "bold" }}>รวมสุทธิ: 620 บาท</Text>
      </View>
    </Page>
  </Document>
);

export default PdfComponents;
