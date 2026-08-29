/**
 * Banner หัวหน้า Directory — คงโครงเดิมตาม design #30
 * (eyebrow → h1 → เส้นคั่น → คำอธิบาย) แต่เปลี่ยนจากพื้นเหลืองเป็นแดงเรียบ
 * แยกเป็น component เดียวเพื่อให้ page / loading / error ใช้ร่วมกัน
 * หน้าจึงไม่กระโดดเวลาสลับสถานะ
 */
export function DirectoryBanner() {
  return (
    <section className="bg-brand px-4 py-14 text-center sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
          เกี่ยวกับสาขาวิชา
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          คณาจารย์
        </h1>
        <span className="mx-auto mt-5 block h-px w-16 bg-white/40" aria-hidden="true" />
        <p className="mt-5 text-sm text-white/80 sm:text-base">
          รายชื่อคณาจารย์ - ภาควิชาวิทยาการคอมพิวเตอร์
        </p>
      </div>
    </section>
  );
}
