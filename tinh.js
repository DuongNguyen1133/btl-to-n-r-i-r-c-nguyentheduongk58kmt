class GiaiThuatLapLich {
    constructor(soLuongChiTiet, soLuongMay, thoiGianGiaCong) {
        this.soLuongChiTiet = soLuongChiTiet;
        this.soLuongMay = soLuongMay;
        this.thoiGianGiaCong = thoiGianGiaCong;
    }

    giai() {
        const thoiGianMin = this.thoiGianGiaCong.reduce((min, item) => min < item.thoiGian ? min : item.thoiGian, Infinity);
        const chiTietMin = this.thoiGianGiaCong.find(item => item.thoiGian === thoiGianMin).chiTiet;

        // Sắp xếp các chi tiết theo thời gian gia công trung bình tăng dần
        const danhSachChiTiet = this.thoiGianGiaCong.sort((a, b) => (a.thoiGian + b.thoiGian) / 2 - (b.thoiGian + a.thoiGian) / 2);

        // Lịch gia công
        const lichGiaCong = [];

        // Gán chi tiết có thời gian gia công nhỏ nhất cho máy 1
        lichGiaCong.push({ chiTiet: chiTietMin, may: "M1" });

        // Gán các chi tiết còn lại
        for (const chiTiet of danhSachChiTiet) {
            if (chiTiet === chiTietMin) {
                continue;
            }

            const thoiGianGiaCongM1 = this.thoiGianGiaCong.find(item => item.chiTiet === chiTiet && item.may === "M1").thoiGian;
            const thoiGianGiaCongM2 = this.thoiGianGiaCong.find(item => item.chiTiet === chiTiet && item.may === "M2").thoiGian;

            if (thoiGianGiaCongM1 <= thoiGianGiaCongM2) {
                lichGiaCong.push({ chiTiet, may: "M1" });
            } else {
                lichGiaCong.push({ chiTiet, may: "M2" });
            }
        }

        return lichGiaCong;
    }
}
