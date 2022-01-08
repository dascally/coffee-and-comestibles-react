import latteImage from '../assets/latte-1.jpg';

const MENU = [
  {
    sectionName: 'Hot drinks',
    items: [
      {
        name: 'Banana bread latte',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quo nemo natus, dolorum accusantium maiores commodi vel voluptatum aperiam dicta, consequuntur veniam enim adipisci ut alias asperiores pariatur, necessitatibus blanditiis.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: ['soy'],
      },
      {
        name: 'Almond mocha latte',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo maxime porro, a vel, ducimus voluptatem accusantium eveniet impedit deleniti rerum nobis autem error, ut amet. Corporis esse vitae aspernatur placeat.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: ['soy', 'tree nuts'],
      },
    ],
  },
  {
    sectionName: 'Cold drinks',
    items: [
      {
        name: 'Iced black tea',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quo nemo natus, dolorum accusantium maiores commodi vel voluptatum aperiam dicta, consequuntur veniam enim adipisci ut alias asperiores pariatur, necessitatibus blanditiis.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: [],
      },
      {
        name: 'Iced green tea',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quo nemo natus, dolorum accusantium maiores commodi vel voluptatum aperiam dicta, consequuntur veniam enim adipisci ut alias asperiores pariatur, necessitatibus blanditiis.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: [],
      },
    ],
  },
  {
    sectionName: 'Baked savory',
    items: [
      {
        name: 'Flatbread with hummus',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quo nemo natus, dolorum accusantium maiores commodi vel voluptatum aperiam dicta, consequuntur veniam enim adipisci ut alias asperiores pariatur, necessitatibus blanditiis.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: [],
      },
    ],
  },
  {
    sectionName: 'Baked sweets',
    items: [
      {
        name: 'Brownie',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quo nemo natus, dolorum accusantium maiores commodi vel voluptatum aperiam dicta, consequuntur veniam enim adipisci ut alias asperiores pariatur, necessitatibus blanditiis.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: ['egg'],
      },
      {
        name: 'Cranberry chocolate chip cookie',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quo nemo natus, dolorum accusantium maiores commodi vel voluptatum aperiam dicta, consequuntur veniam enim adipisci ut alias asperiores pariatur, necessitatibus blanditiis.',
        image: { src: latteImage, alt: 'A latte in a mug' },
        allergens: ['egg'],
      },
    ],
  },
];

export default MENU;
