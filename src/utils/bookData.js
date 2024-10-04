//새 책을 만드는 함수
export const makeNewBook = async (title, color) => {
  try {
    await fetch("https://dangil-artisticsw.site/book/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_title: title,
        note_description: "",
        note_color: color,
      }),
    })
      .then((result) => {
        const res = result.json();
        return res;
      })
      .then((res) => {
        // result가 note_color, note_description 등을 포함한 객체입니다.
        console.log(res.note_color); // note_color 값
        console.log(res.note_title); // note_title 값
        console.log(res.note_description); // note_description 값

        // 변환 작업 예시
        const transformedResult = {
          color: res.note_color,
          title: res.note_title,
          description: res.note_description,
          userId: res.user_id,
        };

        // 변환된 객체를 사용
        return transformedResult;
      });
  } catch (error) {
    console.error("Failed to create book:", error);
  }
};

export const writeBook = async (title, page, text, image, file, color) => {
  await makeNewBook(title, color);
  try {
    const response = await fetch(
      "https://dangil-artisticsw.site/book/page/write",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note_title: title,
          note_page: page,
          note_text: text,
          note_image: file,
          note_file: {},
        }),
      }
    );
    console.log(response);
    if (!response.ok) throw new Error("Failed to write book");
    const data = await response.json();
    console.log("Book write:", data);
    return true;
  } catch (error) {
    console.error("Failed to write book! :", error);
  }
};

// 책 정보 업데이트
export const updateBook = async (title, newTitle, newDescription, color) => {
  try {
    const response = await fetch("https://dangil-artisticsw.site/book/update", {
      method: "PUT", // PUT 메소드 사용
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_title: title, // 기존 제목
        new_note_title: newTitle, // 새 제목
        new_note_description: newDescription, // 새 설명
        new_note_color: color,
      }),
    });
    if (!response.ok) throw new Error("Failed to update book");
    const data = await response.json();
    console.log("Book updated:", data);
  } catch (error) {
    console.error("Failed to update book:", error);
  }
};
