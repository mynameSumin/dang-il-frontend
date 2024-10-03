//새 책을 만드는 함수
export const makeNewBook = async (cookie) => {
  try {
    await fetch("https://dangil-artisticsw.site/book/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_title: "Book name",
        note_description: "",
        note_color: 0,
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
