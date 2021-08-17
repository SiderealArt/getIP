module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => 
      ({"hero-pattern": "url('https://lh3.googleusercontent.com/05TAPA5ys8xYDt-BqPo6EdQ9D5dzmZpgHbyqmGffSXmdw2buB-5_0stQtIWs9zAHAn8lwDTLLWR8z6fXdSonTI4ITWku5DWKj2IxlBIUA6iIEBp3IKR7oWltfDQrTexu_wQRiaYO5gEMcJix_G8Rj0evef-zW_-Cvdilb2-M0E6WmvJEOy62_irpCZSe7eeYaOswICGZo0NLb1sZ7zAdmv34_cJZ64k93S6qiNYoO2Z0-BeAs44QIAX7IW9Ak_dbWccSMuiQTzbPmiitAoTUNi4UlRjDOLuncI10W4UTGHRi4v3fPVqcBvVkhcENRDWwQp_OwruRulojrnAEngrqHkF2KCamcgYRqMO8zkITs0cT1_bPO-ySpTb8Fvdr88qUoFwkQWSLJTtFTi9z1mvQkSbVhEpikFcwftYLVQ7c3q4IN53g3fczV3ZvqvgBAh57rVLm7aNhXT-5ktcR3s8Dkxn6GRNtPyxFU7MUKIgGfSi3_a4hdVkQbOzrA9VQ4RUWSWNvvuvXZfCcmUsFX71J07FaHcO_NtPuTGgfWa4025bf5fCTxr00xeLNjbsnnKDTzNXp7-xtDC7D8KmRJ9sQgoL32jALsYbYTA_NUGfdC_TOGJ9FUHRU5fMQQm5mUpnHWMkoAiUOib5KPYdVacWiVcj2EkCRsXaQ4EHx8kU8vrVQ3_pG-R5z_8cXP4he_NwsNzl3rO2KOHIp0TQmAm1cBKHa=w598-h449-no?authuser=0')",
    }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

