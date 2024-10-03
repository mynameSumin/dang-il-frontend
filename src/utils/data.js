//로그인을 했을 경우 사용자 위주로 보여줄 정보 가져오기
export const getUserDataAfterLogin = async (cookies) => {
  try {
    // Fetch 요청
    const response = await fetch("https://dangil-artisticsw.site/mainpage", {
      method: "GET",
      credentials: "include", // 쿠키 포함
      headers: {
        Cookie: "session_id=" + cookies.session_id,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답 데이터를 객체로 변환
    const fetchedData = await response.json();
    console.log(fetchedData);

    const fetchedUserData = fetchedData.data.user_data.my_data;
    const friendData = fetchedData.data.user_data.friend_data;
    const unknownData = fetchedData.data.user_data.unknown_user_data;

    return [fetchedUserData, friendData, unknownData];
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

//logout 함수
export const handleLogout = (cookies) => {
  fetch("https://dangil-artisticsw.site/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_id=${cookies.session_id}`, // 쿠키 설정
    },
  })
    .then((response) => {
      console.log(response, ": hi");
      if (response.ok) {
        window.location.href = "/"; // 로그아웃 후 게스트 모드로 이동
      } else {
        console.error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("An error occurred during logout:", error);
      console.log(error);
    });
};

//tag나 name으로 친구를 찾는 함수
export const searchFriend = async (name) => {
  const res = await fetch("https://dangil-artisticsw.site/friend/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search_word: name,
    }),
  })
    .then((response) => {
      const reader = response.body.getReader(); // ReadableStream의 리더를 얻음
      return reader.read();
    })
    .then(({ done, value }) => {
      if (done) {
        console.log("읽기 완료");
        return;
      }
      const decoder = new TextDecoder();
      const text = decoder.decode(value);
      const data = JSON.parse(text);

      const userData = data.user_data_list;
      console.log("읽은 데이터:", userData);
      return userData;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};

//친구 신청 보내는 함수
export const inviteFriend = async (myId, receiverId) => {
  const res = await fetch("https://dangil-artisticsw.site/friend/apply", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender_id: myId.toString(),
      receiver_id: receiverId.toString(),
    }),
  });

  if (res.status == 200) {
    alert("친구신청이 완료되었습니다");
  } else if (res.status == 204) {
    alert("이미 신청을 보낸 친구입니다");
  }
};

export const saveUrl = async (myId, url) => {
  try {
    const res = await fetch(
      "https://dangil-artisticsw.site/youtube/video/save",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: myId,
          video_id: url,
        }),
      }
    );

    if (res.status === 200) {
      alert("동영상 저장 성공");
    } else {
      const errorData = await res.json();
      alert(`동영상 저장 실패: ${errorData.message}`);
    }
  } catch (error) {
    console.error("동영상 저장 실패: ", error);
    alert("동영상 저장 중 오류가 발생했습니다.");
  }
};

export const deleteUrl = async (myId, videoId) => {
  try {
    const res = await fetch(
      "https://dangil-artisticsw.site/youtube/video/delete",
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: myId,
          video_id: videoId,
        }),
      }
    );

    if (res.status === 200) {
      alert("동영상 삭제 성공");
    } else {
      const errorData = await res.json();
      alert(`동영상 삭제 실패: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    alert("동영상 삭제 중 오류가 발생했습니다.");
  }
};

export const updateUrl = async (myId, oldVideoId, newVideoId) => {
  try {
    const res = await fetch(
      "https://dangil-artisticsw.site/youtube/video/update",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: myId,
          old_video_id: oldVideoId,
          new_video_id: newVideoId,
        }),
      }
    );

    if (res.status === 200) {
      alert("동영상 업데이트 성공");
    } else {
      const errorData = await res.json();
      alert(`동영상 업데이트 실패: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error updating video:", error);
    alert("동영상 업데이트 중 오류가 발생했습니다.");
  }
};
