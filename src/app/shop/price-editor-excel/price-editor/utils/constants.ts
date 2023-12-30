export const data = [
  {
    id: 54221231231,
    brandName: 'Apple',
    phoneName: null,
    phoneMemory: null,
    phoneColor: null,
    phonePrice: null,
    phoneExist: false,
    __children: [
      {
        id: 4552,
        brandName: null,
        phoneName: 'Iphone X',
        phoneMemory: null,
        phoneColor: null,
        phonePrice: null,
        phoneExist: null,
        __children: [
          {
            id: null,
            brandName: null,
            phoneName: null,
            phoneMemory: '64GB',
            phoneColor: null,
            phonePrice: null,
            phoneExist: null,
            __children: [
              {
                id: null,
                brandName: null,
                phoneName: null,
                phoneMemory: null,
                phoneColor: 'White',
                phonePrice: null,
                phoneExist: null,
              },
              {
                id: null,
                brandName: null,
                phoneName: null,
                phoneMemory: null,
                phoneColor: 'Black',
                phonePrice: null,
                phoneExist: null,
              },
              {
                id: null,
                brandName: null,
                phoneName: null,
                phoneMemory: null,
                phoneColor: 'Blue',
                phonePrice: null,
                phoneExist: null,
              },
            ],
          },
        ],
      },
    ],
  },
];
export const SELECTED_CLASS = 'selected';
export const DEFAULT_ALIGNMENT_CLASS = 'htLeft';
export const ODD_ROW_CLASS = 'odd';

export function getData() {
  return data;
}
