import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapContainerLeaflet"), {
  ssr: false,
});

export default Map;
