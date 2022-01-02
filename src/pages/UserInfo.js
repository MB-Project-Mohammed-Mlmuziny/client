import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

import { Layout, Avatar, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { CourseCard } from "./../components/CourseCard";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState();

  const { token } = useSelector((state) => state.account);
  const { user_id } = useParams();

  const getUserInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/info/${user_id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          setUserInfo(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return userInfo ? (
    <Layout.Content className="content" style={{ minHeight: "100vh" }}>
      <div className="box">
        <h1>{userInfo.name}</h1>
        <Avatar
          // alt={userInfo.name}
          src={userInfo.avatar}
          // sx={{ width: 56, height: 56 }}
        />
        <br />
        <br />

        <h1>Headline</h1>
        <p>{userInfo.headline}</p>
        <br />

        <h1>About</h1>
        <p>{userInfo.about}</p>
        <br />

        <h1>created course</h1>
        {userInfo.course[0] ? (
          <Row gutter={[24, 24]}>
            {userInfo.course.map((course) => (
              <CourseCard course={course} key={course._id + "created"} />
            ))}
          </Row>
        ) : (
          <p>this user dont create any course yet</p>
        )}

        <h1>enrole course</h1>
        {userInfo.enrole[0] ? (
          <Row gutter={[24, 24]}>
            {userInfo.enrole.map((course) => (
              <CourseCard course={course} key={course._id + "enrole"} />
            ))}
          </Row>
        ) : (
          <p>this user dont create any course yet</p>
        )}
      </div>
    </Layout.Content>
  ) : (
    <Layout.Content className="centering">
      <LoadingOutlined  className="loadingIcon"/>
    </Layout.Content>
  );
};
