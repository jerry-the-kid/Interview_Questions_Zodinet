// Calculate sum from startNumber to endNumber
const totalInRange = (startNum, endNum) => {
  let sum = 0;
  for (let i = startNum; i <= endNum; i++) {
    sum = sum + i;
  }
  return sum;
};

const calc = (startNum, endNum, isDouble) => {
  let result = totalInRange(startNum, endNum);
  if (isDouble) {
    result = result * 2;
  }
  return result;
};

/*
    Sử dụng function expression thay cho function declaration
    Thay thế các biến var thành let hoặc const. Dùng let khi dữ liệu cần thay đổi (Như res).

    Vì : Function declaration và biến var dễ xảy ra tình trạng hoisting. Tức là hiện tượng
    sử dụng function hoặc biến trước khi khai báo => Xảy ra lỗi => Khó bảo trì và fix bug.
*/

/*
  Dùng tên biến, hàm có ý nghĩa
  Dùng theo các chuẩn như calmelcase, underscore,...
  nhằm giúp code readable, dễ maintain  
*/

/*
    Dùng phép so sanh === thay vì so sánh ==
    Vì dấu === sẽ so sánh kết quả của 2 vế. Tránh các tình trạng như 0 == false hay 1 == "1"
    Sẽ gây ra lỗi
*/

/*
    if nếu tên biến dễ đọc và dạng boolean có thể dùng như sau if (isDouble) 
    thay cho if(isDouble === true) sẽ dễ đọc hơn và ngắn gọn code
*/

/*
    Viết description cho hàm nếu cần
*/
