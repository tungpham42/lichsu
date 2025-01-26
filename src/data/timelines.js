import lessons from "./lessons.json"; // Thay path phù hợp nếu cần

export const timelineData = lessons.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  period: item.period,
}));
