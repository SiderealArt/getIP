<template>
<div id="alert" class="flex items-center hidden bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  <p>Please turn off Adblock to detect your IP (Adblock will block the API call). We won't insert any ads.</p>
</div>
  <div class="flex flex-col h-screen max-h-screen">
    <div
      class="
        z-20
        flex
        justify-center
        relative
        bg-hero-pattern bg-cover bg-center
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
          minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
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
    let a;
    const query = ref("");
    const info = ref(null);
    onMounted(() => {
      mymap = leaflet.map("mapid", {zoomControl: false}).setView([22.585, 120.358], 15);
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
      mymap._handlers.forEach(function(handler) {
    handler.disable();
    if (window.canRunAds === undefined) {
      document.getElementById("alert").classList.remove("hidden");
    }
});
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
        if(a){
          a.remove();
        }
        a=leaflet.marker([fin.latitude, fin.longitude]).addTo(mymap);
        mymap.panTo([fin.latitude, fin.longitude]);
      } catch (e) {
        console.log(e);
      }
    };
    return { query, info, getIPinfo };
  },
};
</script>
