/* ============================================================
   INVESTOR DOCUMENT ARCHIVE — real PDFs downloaded from the
   original najrancement.com site, stored under /public/documents.
   View + Download both point at the local files (no hotlinking).
   ============================================================ */

export type Report = { year: number; label: string; file: string };

const FR = "/documents/financial-reports";
const GA = "/documents/general-assembly";
const BR = "/documents/board-reports";

export const FINANCIAL_REPORTS: Report[] = [
  { year: 2025, label: "3rd Quarter 2025", file: `${FR}/2025-q3.pdf` },
  { year: 2025, label: "2nd Quarter 2025", file: `${FR}/2025-q2.pdf` },
  { year: 2025, label: "1st Quarter 2025", file: `${FR}/2025-q1.pdf` },
  { year: 2024, label: "Annual 2024", file: `${FR}/2024-annual.pdf` },
  { year: 2024, label: "3rd Quarter 2024", file: `${FR}/2024-q3.pdf` },
  { year: 2024, label: "2nd Quarter 2024", file: `${FR}/2024-q2.pdf` },
  { year: 2024, label: "1st Quarter 2024", file: `${FR}/2024-q1.pdf` },
  { year: 2023, label: "Annual 2023", file: `${FR}/2023-annual.pdf` },
  { year: 2023, label: "3rd Quarter 2023", file: `${FR}/2023-q3.pdf` },
  { year: 2023, label: "2nd Quarter 2023", file: `${FR}/2023-q2.pdf` },
  { year: 2023, label: "1st Quarter 2023", file: `${FR}/2023-q1.pdf` },
  { year: 2022, label: "3rd Quarter 2022", file: `${FR}/2022-q3.pdf` },
  { year: 2022, label: "2nd Quarter 2022", file: `${FR}/2022-q2.pdf` },
  { year: 2022, label: "1st Quarter 2022", file: `${FR}/2022-q1.pdf` },
  { year: 2021, label: "Annual 2021", file: `${FR}/2021-annual.pdf` },
  { year: 2021, label: "3rd Quarter 2021", file: `${FR}/2021-q3.pdf` },
  { year: 2021, label: "2nd Quarter 2021", file: `${FR}/2021-q2.pdf` },
  { year: 2021, label: "1st Quarter 2021", file: `${FR}/2021-q1.pdf` },
  { year: 2020, label: "Annual 2020", file: `${FR}/2020-annual.pdf` },
  { year: 2020, label: "3rd Quarter 2020", file: `${FR}/2020-q3.pdf` },
  { year: 2020, label: "2nd Quarter 2020", file: `${FR}/2020-q2.pdf` },
  { year: 2020, label: "1st Quarter 2020", file: `${FR}/2020-q1.pdf` },
  { year: 2019, label: "Annual 2019", file: `${FR}/2019-annual.pdf` },
  { year: 2019, label: "3rd Quarter 2019", file: `${FR}/2019-q3.pdf` },
  { year: 2019, label: "2nd Quarter 2019", file: `${FR}/2019-q2.pdf` },
  { year: 2019, label: "1st Quarter 2019", file: `${FR}/2019-q1.pdf` },
  { year: 2018, label: "3rd Quarter 2018", file: `${FR}/2018-q3.pdf` },
  { year: 2018, label: "2nd Quarter 2018", file: `${FR}/2018-q2.pdf` },
  { year: 2017, label: "3rd Quarter 2017", file: `${FR}/2017-q3.pdf` },
  { year: 2017, label: "2nd Quarter 2017", file: `${FR}/2017-q2.pdf` },
];

export const GENERAL_ASSEMBLY: Report[] = [
  { year: 2022, label: "2022 Annual General Assembly", file: `${GA}/ga-2022.pdf` },
  { year: 2021, label: "2021 Annual General Assembly", file: `${GA}/ga-2021.pdf` },
  { year: 2020, label: "2020 Annual General Assembly", file: `${GA}/ga-2020.pdf` },
  { year: 2019, label: "2019 Annual General Assembly", file: `${GA}/ga-2019.pdf` },
  { year: 2018, label: "2018 Annual General Assembly", file: `${GA}/ga-2018.pdf` },
  { year: 2017, label: "2017 Annual General Assembly", file: `${GA}/ga-2017-agm.pdf` },
  { year: 2017, label: "2017 Extraordinary General Assembly", file: `${GA}/ga-2017-egm.pdf` },
  { year: 2016, label: "2016 Annual & Extraordinary Assembly (March)", file: `${GA}/ga-2016-mar.pdf` },
  { year: 2016, label: "2016 Annual General Assembly (October)", file: `${GA}/ga-2016-oct.pdf` },
  { year: 2016, label: "2016 Extraordinary General Assembly", file: `${GA}/ga-2016-egm.pdf` },
  { year: 2015, label: "2015 Annual General Assembly", file: `${GA}/ga-2015-agm.pdf` },
  { year: 2015, label: "2015 Extraordinary General Assembly", file: `${GA}/ga-2015-egm.pdf` },
  { year: 2014, label: "2014 Annual General Assembly", file: `${GA}/ga-2014.pdf` },
  { year: 2013, label: "2013 Annual General Assembly", file: `${GA}/ga-2013.pdf` },
  { year: 2012, label: "2012 Extraordinary General Assembly", file: `${GA}/ga-2012.pdf` },
];

export const BOARD_REPORTS: Report[] = Array.from({ length: 12 }, (_, i) => {
  const year = 2024 - i;
  return { year, label: `Board of Directors Report ${year}`, file: `${BR}/board-${year}.pdf` };
});

export const REPORTS: Record<"financial" | "assembly" | "board", Report[]> = {
  financial: FINANCIAL_REPORTS,
  assembly: GENERAL_ASSEMBLY,
  board: BOARD_REPORTS,
};
