import { Col, Row, Skeleton } from "antd";

export const LoadingProfileComponent = () => {
  return (
    <>
      <Row>
        <Col offset={4} span={16}>
          <div className="cover w-full h-80 rounded-br-lg rounded-bl-lg relative">
            <Skeleton className="pt-4" active paragraph={{ rows: 6 }} />
          </div>
          <div className="avatar ">
            <Skeleton.Image
              active
              style={{
                width: "10rem",
                height: "10rem",
                borderRadius: "50%",
              }}
            />
          </div>
          <Row className="py-5">
            <Col offset={6} span={12}>
              <Skeleton className="pt-4" active paragraph={{ rows: 4 }} />
            </Col>
            <Col span={6}>
              <div className="chat_Follow flex justify-around items-center w-full h-full">
                <div className="editProfile">
                  <Skeleton.Button active />
                </div>
              </div>
            </Col>
          </Row>
          <Col span={18} className="mt-5">
            <Skeleton className="pt-4" active paragraph={{ rows: 4 }} />
          </Col>
          <div className="mainContain mt-16">
            <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
            <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
            <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
            <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
          </div>
        </Col>
      </Row>
    </>
  );
};
