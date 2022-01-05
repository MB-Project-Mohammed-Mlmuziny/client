import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { Layout, Menu, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Comments } from "./../components/Comments";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const CourseLearn = () => {
  const [course, setCourse] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [lessonContent, setLessonContent] = useState("");

  const { courseId } = useParams();

  const navigate = useNavigate();

  const getCourseInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/${courseId}`)
        .then((result) => {
          setCourse(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    navigate("/user/" + course.creator._id);
  };

  useEffect(() => {
    getCourseInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (course)
      if (course.lessonContent)
        if (course.lessonContent[0].lessons)
          setLessonContent(course.lessonSections[0].lessons[0].lesson);
  }, [course]);

  return course ? (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        {course.lessonSections[0] ? (
          <Menu
            defaultSelectedKeys={[course.lessonSections[0].lessons[0]._id]}
            defaultOpenKeys={[course.lessonSections[0]._id]}
            theme="dark"
            mode="inline"
          >
            {course.lessonSections.map((section) => (
              <SubMenu key={section._id} title={section.sectionName}>
                {section.lessons.map((lesson) => (
                  <Menu.Item
                    onClick={() => setLessonContent(lesson.lesson)}
                    key={lesson._id}
                  >
                    {lesson.lessonName}
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        ) : (
          <Empty
            theme="dark"
            description={<span style={{ color: "white" }}> no lesson yet</span>}
          />
        )}
      </Sider>

      <Content className="content_courseLearn">
        <h1>{course.title}</h1>

        <h1>
          created by:
          <h1
            onClick={handleUserInfo}
            className="pointer"
            variant="button"
            sx={{ textDecoration: "underline", color: "blue" }}
          >
            {course.creator.name}
          </h1>
        </h1>
        <hr />

        <ReactPlayer url={lessonContent} controls={true} width="100%" />

        <h1>Description</h1>
        <p>{course.description}</p>

        <h1>About</h1>
        <p>{course.about}</p>

        <h1>Comments</h1>
        <Comments course={course} getCourseInfo={getCourseInfo} />
      </Content>
    </Layout>
  ) : (
    <Layout.Content className="content">
      <LoadingOutlined className="loadingIcon" />
    </Layout.Content>
  );
};
