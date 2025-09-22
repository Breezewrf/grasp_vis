import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import Panel from "./Panel";

const RGBCameraFeed: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: "ws://localhost:9090", // 确认 rosbridge_websocket 的地址
    });

    const rgbTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/tag_placement_image/compressed",
      messageType: "sensor_msgs/CompressedImage",
    });

    rgbTopic.subscribe((message: any) => {
      // CompressedImage.data 是 JPEG 字节数组，roslibjs 会转成 base64 string
      setImageSrc(`data:image/jpeg;base64,${message.data}`);
    });

    return () => {
      rgbTopic.unsubscribe();
      ros.close();
    };
  }, []);

  return (
    <Panel title="RGB Camera Feed" className="flex-1">
      <div className="relative w-full h-full bg-black rounded-md overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="RGB Camera Feed"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">ROS2 Camera Stream</p>
            <p className="font-mono text-sm">/tag_placement_image/compressed</p>
            <p className="text-xs mt-2">(Waiting for image data...)</p>
          </div>
        )}

        {/* Conveyor Belt ROI */}
        <div className="absolute top-1/8 left-1/4 right-1/4 h-1/2 border-2 border-dashed border-blue-500/50"></div>
      </div>
    </Panel>
  );
};

export default RGBCameraFeed;
