export default function labelFor(list, id) {
  return list.find((item) => item.id === id)?.label ?? id;
}