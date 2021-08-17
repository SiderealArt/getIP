<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div
      class="
        z-20
        flex
        justify-center
        relative
        bg-hero-pattern bg-cover
        px-4
        pt-8
        pb-32
      "
    >
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">
          What's My IP address?
        </h1>
        <div class="flex">
          <input
            v-model="query"
            type="text"
            class="
              flex-1
              py-3
              px-2
              rounded-tl-md rounded-bl-md
              focus:outline-none
            "
            placeholder="or find other people's IP address here..."
          />
          <i
            @click="getIPinfo"
            class="
              fas
              fa-chevron-right
              cursor-pointer
              bg-black
              text-white
              px-4
              flex
              items-center
              rounded-tr-md rounded-br-md
            "
          ></i>
        </div>
      </div>
      <Info v-if="info" v-bind:info="info" />
    </div>
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Info from "../components/Info.vue";
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  name: "Home",
  components: { Info },
  setup() {
    let mymap;
    const query = ref("");
    const info = ref(null);
    onMounted(() => {
      mymap = leaflet.map("mapid").setView([22.585, 120.358], 15);
      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1Ijoic2lkZXJlYWxhcnQiLCJhIjoiY2tzZmJ4bHM2MHBmczMwb2ZxdDk0cDMwcCJ9.aaX4wYrpIlCsxghMLxcpWA",
          }
        )
        .addTo(mymap);
      getIPinfo();
    });
    const getIPinfo = async () => {
      try {
        const res = await axios.get(
          `https://api.ipdata.co/${query.value}?api-key=a6f751742f3cdc45e555c734e2b150c8f616c07d7f52d10295430ee9`
        );
        const fin = res.data;
        info.value = {
          address: fin.ip,
          city: fin.city,
          timezone: fin.time_zone.offset,
          isp: fin.asn ? fin.asn.name : "",
          lat: fin.latitude,
          lon: fin.longitude,
        };

        leaflet.marker([fin.latitude, fin.longitude]).addTo(mymap);
        mymap.panTo([fin.latitude, fin.longitude]);
      } catch (e) {
        console.log(e);
      }
    };
    return { query, info, getIPinfo };
  },
};
</script>
