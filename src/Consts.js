class Consts {
    static areas = [
        { area_id: 0, name: "寮あり" },
        { area_id: 1, name: "北海道・東北エリア" },
        { area_id: 2, name: "関東エリア" },
        { area_id: 3, name: "甲信越・北陸エリア" },
        { area_id: 4, name: "東海エリア" },
        { area_id: 5, name: "近畿エリア" },
        { area_id: 6, name: "中国・四国エリア" },
        { area_id: 7, name: "九州・沖縄エリア" }
    ];

    static categories = [
        { value: 0, label: "バランス"},
        { value: 1, label: "収入"},
        { value: 2, label: "安定"},
        { value: 3, label: "ライフスタイル"},
        { value: 4, label: "環境"},
        { value: 5, label: "診断外"}
      ];

      static sexs = [
        {value: 1, label: "男性"},
        {value: 2, label: "女性"},
        {value: 3, label: "答えない"}
    ];

    static prefectures = [
        {id: 1, name: '北海道', area_id: 1}, {id: 2, name: '青森県', area_id: 1}, {id: 3, name: '岩手県', area_id: 1},
        {id: 4, name: '宮城県', area_id: 1}, {id: 5, name: '秋田県', area_id: 1}, {id: 6, name: '山形県', area_id: 1},
        {id: 7, name: '福島県', area_id: 1}, {id: 8, name: '茨城県', area_id: 2}, {id: 9, name: '栃木県', area_id: 2},
        {id: 10, name: '群馬県', area_id: 2}, {id: 11, name: '埼玉県', area_id: 2}, {id: 12, name: '千葉県', area_id: 2},
        {id: 13, name: '東京都', area_id: 2}, {id: 14, name: '神奈川県', area_id: 2}, {id: 15, name: '新潟県', area_id: 3},
        {id: 16, name: '富山県', area_id: 3}, {id: 17, name: '石川県', area_id: 3}, {id: 18, name: '福井県', area_id: 3},
        {id: 22, name: '静岡県', area_id: 4}, {id: 23, name: '愛知県', area_id: 4}, {id: 24, name: '三重県', area_id: 4},
        {id: 25, name: '滋賀県', area_id: 5}, {id: 26, name: '京都府', area_id: 5}, {id: 27, name: '大阪府', area_id: 5},
        {id: 28, name: '兵庫県', area_id: 5}, {id: 29, name: '奈良県', area_id: 5}, {id: 30, name: '和歌山県', area_id: 5},
        {id: 31, name: '鳥取県', area_id: 6}, {id: 32, name: '島根県', area_id: 6}, {id: 33, name: '岡山県', area_id: 6},
        {id: 34, name: '広島県', area_id: 6}, {id: 35, name: '山口県', area_id: 6}, {id: 36, name: '徳島県', area_id: 6},
        {id: 37, name: '香川県', area_id: 6}, {id: 38, name: '愛媛県', area_id: 6}, {id: 39, name: '高知県', area_id: 6},
        {id: 40, name: '福岡県', area_id: 7}, {id: 41, name: '佐賀県', area_id: 7}, {id: 42, name: '長崎県', area_id: 7},
        {id: 43, name: '熊本県', area_id: 7}, {id: 44, name: '大分県', area_id: 7}, {id: 45, name: '宮崎県', area_id: 7},
        {id: 46, name: '鹿児島県', area_id: 7}, {id: 47, name: '沖縄県', area_id: 7}
  ];

  static wages = [
    "200万円以下",
    "250万円以下",
    "300万円以下",
    "350万円以下",
    "400万円以下",
    "400万円以上"
];
};

export default Consts;
