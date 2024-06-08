/* eslint-disable @next/next/no-img-element */
"use client";
// import Image from "next/image";
// import MapContainerLeaflet from "../components/MapContainerLeaflet";
import Map from "../components/Map";
import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  HistoryOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, ConfigProvider } from "antd";
import Image from "next/image";
const { Sider, Content } = Layout;

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface DaysHours {
  [key: string]: string[] | undefined;
}

interface Truck {
  locationid: number;
  applicant: string;
  facility_type: string;
  location_description: string;
  address: string;
  status: string;
  food_items: string[];
  latitude: number;
  longitude: number;
  dayshours: DaysHours;
  expiration_date: string;
  location: string;
  is_open: Boolean;
  distance_km: number | null;
}

export default function Home() {
  const [collapsed, setCollapsed] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
  const [foodTruck, setFoodTruck] = useState<Truck | undefined>();
  const [position, setPosition] = useState<[number, number]>();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const setShowDetailInside = (value: boolean) => {
    setShowDetail(value);
  };

  const setTruck = (value: Truck) => {
    setFoodTruck(value);
  };

  const fetchProperties = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const requestBody = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-nearby-food-trucks/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Add your custom headers here
                  // For example:
                  // 'Authorization': 'Bearer <your_token>'
                },
                body: JSON.stringify(requestBody),
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            await setFoodTrucks(data);
          },
          (error) => {
            console.error("Error getting location: ", error);
            alert(
              "Unable to retrieve your location. Please check your browser settings and permissions."
            );
          }
        );
      } else {
        alert(
          "Geolocation is not supported by this browser. Please try a different browser."
        );
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  // useEffect(() => {
  //   setFoodTrucks(truckSetup);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="w-full h-screen fixed">
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg: "#000",
            },
          },
          token: {
            // colorBgElevated: "#fff",
            // controlItemBgHover: "#fff",
            // colorFillSecondary: "#F8FAFC",
            // controlItemBgActive: "",
          },
        }}
      >
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="demo-logo-vertical" />
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 48,
                height: 48,
                marginLeft: 16,
              }}
            />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <HeartOutlined />,
                  label: "Saved",
                },
                {
                  key: "2",
                  icon: <HistoryOutlined />,
                  label: "History",
                },
              ]}
            />
          </Sider>
          <Layout>
            <Content>
              <div className="relative">
                <div className="absolute top-5 left-10 z-40">
                  <button
                    className="bg-black text-white text-md py-2 px-3 rounded-2xl"
                    onClick={() => {
                      setShowNearby(true);
                      fetchProperties();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="m267.2 25.08l-70 70.16c-7.7 7.66-7.3 16.86-2.4 26.96l2 4.3l-3.1 2.9l-23.6 22.3l21.7 21.6l22.2-23.7l2.9-3l4.2 1.9c10.7 5.3 20.6 5.7 27.7-1.4L319 76.85l-10.2-10.18l-45.7 45.63l-9.6-9.8L299 56.97l-10.9-11.03l-45.5 45.7l-9.7-9.7l45.5-45.69zM28.97 27.84c-5.73 9.12-6.61 20.83-3.32 34.58c3.87 16.32 13.68 35.22 27.41 53.08c27.35 35.8 50.04 48.1 86.84 54.8l2.4.4c13.6 16.1 27.2 32.1 40.8 48.2h37.1zM137 183.2l-37.74 35.7h49.64l9.7-10.3zM26.25 232.9v63.5l16.51-49.5H279.8l16.5 49.5v-63.5zm29.49 32l-10 30h45.04l10.02-30zm63.96 0l-10 30h42.6v-30zm50.6 0v30h42.6l-10-30zm51.4 0l10 30h45.1l-10-30zm92.6 1.8v188.2h79c4.2-18.2 20.6-32 40-32s35.8 13.8 40 32h15v-64l-56.2-14H328.3v-82H390l-6.9-15zM26.25 312.9v114.2l42.17 27.8h14.85c4.14-18.2 20.53-32 40.03-32c19.4 0 35.8 13.8 40 32h133v-142h-14v80H40.25v-80zm320.05 0v46h72.4l-23-46zm-281.05 19l16 16h16l16.05-16zm-8 27v18H265.3v-18zm66.05 82c-12.9 0-23.1 10.2-23.1 23s10.2 23 23.1 23c12.8 0 23-10.2 23-23s-10.2-23-23-23m310 0c-12.8 0-23 10.2-23 23s10.2 23 23 23s23-10.2 23-23s-10.2-23-23-23"
                        />
                      </svg>
                      <p>Find nearby food trucks</p>
                    </div>
                  </button>
                </div>
                <div className="absolute bottom-2 z-40 w-full flex justify-center mx-auto text-black text-lg font-light">
                  <p className="bg-white px-2">
                    Brought to you by StreetFeast Scout
                  </p>
                </div>
                {(showDetail || showNearby) && (
                  <div
                    className={`absolute top-5 left-1 z-50 h-[96%] grid gap-5 bg-slate-100 rounded-xl ${
                      showDetail && showNearby
                        ? "grid-cols-2 w-[50%]"
                        : "grid-cols-1 w-[25%]"
                    }`}
                  >
                    {showNearby && (
                      <div className="col-span-1 relative p-5 overflow-y-scroll">
                        <button
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setShowNearby(false);
                            setShowDetail(false);
                          }}
                        >
                          <CloseOutlined style={{ fontSize: "24px" }} />
                        </button>
                        <p className="text-lg font-semibold text-purple-950">
                          Nearby Food Trucks
                        </p>
                        <div className="flex flex-col pt-2 gap-4  font-Roboto">
                          {foodTrucks
                            ? foodTrucks.map((truck: Truck, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    setFoodTruck(truck);
                                    setShowDetail(true);
                                  }}
                                  className="hover:bg-gray-200 cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    <img
                                      src="https://innovokitchen.com/wp-content/uploads/2022/01/Innovo-Food-Truck-13.jpg"
                                      alt="food truck"
                                      className="w-17 h-20 rounded-lg"
                                    />
                                    <div>
                                      <p className="text-md font-semibold">
                                        {truck.applicant}
                                      </p>
                                      <p className="text-sm">
                                        {truck.distance_km} km away
                                      </p>
                                      <p className="text-sm">{truck.address}</p>
                                      {truck.is_open ? (
                                        <p className="text-sm text-green-600">
                                          {" "}
                                          Open
                                        </p>
                                      ) : (
                                        <p className="text-sm text-red-600">
                                          {" "}
                                          Closed
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                                <div key={index}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src="https://via.placeholder.com/150"
                                      alt="food truck"
                                      className="w-16 h-16 rounded-full"
                                    />
                                    <div>
                                      <div>
                                        <p className="text-lg">
                                          Food Truck Name
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    )}
                    {showDetail && (
                      <div className="col-span-1 relative bg-white p-5">
                        <button
                          className="absolute top-2 right-2"
                          onClick={() => setShowDetail(false)}
                        >
                          <CloseOutlined style={{ fontSize: "24px" }} />
                        </button>
                        <div className="flex flex-col gap-y-6 overflow-y-scroll no-scrollbar mt-4 font-Roboto">
                          <div className="w-full">
                            <Image
                              src="https://innovokitchen.com/wp-content/uploads/2022/01/Innovo-Food-Truck-13.jpg"
                              alt="learning"
                              className="h-full w-full object-fill object-center lg:h-full lg:w-full  border-opacity-5 group-hover:p-[1px] z-0"
                              width={500}
                              height={500}
                            />
                          </div>
                          {foodTruck ? (
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-md font-semibold">
                                  Applicant:
                                </p>
                                <p className="text-md">{foodTruck.applicant}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="text-md font-semibold">
                                  Location:
                                </p>
                                <p className="text-sm">
                                  {foodTruck.location_description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="text-md font-semibold">
                                  Address:
                                </p>
                                <p className="text-sm">{foodTruck.address}</p>
                              </div>
                              <div className="flex items-center gap-2 w-full">
                                <p className="text-md font-semibold">
                                  Food Items:
                                </p>
                                <p className="text-sm">
                                  {foodTruck.food_items.join(", ")}
                                </p>
                              </div>
                              {foodTruck.distance_km && (
                                <div className="flex items-center gap-2">
                                  <p className="text-md font-semibold">
                                    Distance:
                                  </p>
                                  <p className="text-sm">
                                    {foodTruck.distance_km} km away
                                  </p>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <p className="text-md font-semibold">Status:</p>
                                {foodTruck.is_open ? (
                                  <p className="text-sm text-green-600">
                                    {" "}
                                    Open
                                  </p>
                                ) : (
                                  <p className="text-sm text-red-600">
                                    {" "}
                                    Closed
                                  </p>
                                )}
                              </div>
                              <div className="w-full mt-5">
                                <button
                                  className="bg-black text-white text-lg py-2 px-3 rounded-2xl w-full"
                                  onClick={() => {
                                    setShowDetail(false);
                                    setPosition([
                                      foodTruck.latitude,
                                      foodTruck.longitude,
                                    ]);
                                  }}
                                >
                                  <div className="flex items-center gap-2 justify-center">
                                    <p>See on map</p>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1.2em"
                                      height="1.2em"
                                      viewBox="0 0 32 32"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                                      />
                                      <path
                                        fill="currentColor"
                                        d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                                      />
                                    </svg>
                                  </div>
                                </button>
                              </div>
                            </div>
                          ) : (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                              <div key={index}>
                                <div className="flex items-center gap-2">
                                  <img
                                    src="https://via.placeholder.com/150"
                                    alt="food truck"
                                    className="w-16 h-16 rounded-full"
                                  />
                                  <div>
                                    <div>
                                      <p className="text-lg">Food Truck Name</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Map
                  setShowDetails={setShowDetailInside}
                  setTruck={setTruck}
                  position_={position}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
