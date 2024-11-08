export interface BannerType {
  _type: string;
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  subtitle: string;
  title: string;
  price: number;
  description: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

type Slug = {
  current: string;
  _type: string;
};

type Image = {
  _type: string;
  asset: object;
};

type Category = object;

export interface Product {
  _rev: string;
  description: string;
  price: number;
  rowprice: number;
  isnew: boolean;
  _createdAt: string;
  position: string;
  slug: Slug;
  rating: number;
  title: string;
  brand: string;
  image: Image;
  category: Category[];
  _id: string;
  _type: string;
  _updatedAt: string;
  quantity: number;
}

export interface StateType {
  name: {
    cart: Product[];
    userInfo: any;
  };
}
