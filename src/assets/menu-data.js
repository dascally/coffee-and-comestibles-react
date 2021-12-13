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
    items: [],
  },
  {
    sectionName: 'Baked savory',
    items: [],
  },
  {
    sectionName: 'Baked sweets',
    items: [],
  },
];

export default MENU;
