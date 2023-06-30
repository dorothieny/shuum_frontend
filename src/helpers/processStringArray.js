export function processStringArray(str, tag) {
  if (!Array.isArray(tag)) {
    console.error('Ошибка: Параметр tag должен быть массивом');
    return tag;
  }

  if (typeof str !== 'string') {
    console.error('Ошибка: Параметр str должен быть строкой');
    return tag;
  }

  if (tag.includes(str)) {
    // Если строка уже есть в массиве, удаляем ее
    tag = tag.filter(item => item !== str);
  } else {
    // Если строки нет в массиве, добавляем ее в конец
    tag.push(str);
  }

  return tag;
}