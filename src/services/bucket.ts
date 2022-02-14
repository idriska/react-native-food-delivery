import * as Bucket from '@spica-devkit/bucket';
/**
 * Call this method before interacting with buckets.
 * @param initOptions Initialize options to initialize the '@spica-devkit/bucket'.
 */
export function initialize(
  ...initOptions: Parameters<typeof Bucket.initialize>
) {
  initOptions[0].publicUrl =
    'https://spica-starters-7229b.hq.spicaengine.com/api';
  Bucket.initialize(...initOptions);
}

type Rest<T extends any[]> = ((...p: T) => void) extends (
  p1: infer P1,
  ...rest: infer R
) => void
  ? R
  : never;
type getArgs = Rest<Parameters<typeof Bucket.data.get>>;
type getAllArgs = Rest<Parameters<typeof Bucket.data.getAll>>;
type realtimeGetArgs = Rest<Parameters<typeof Bucket.data.realtime.get>>;
type realtimeGetAllArgs = Rest<Parameters<typeof Bucket.data.realtime.getAll>>;
type id = { _id: string };

export interface Courier {
  _id?: string;
  name?: string;
  current_orders?: ((Order & id) | string)[];
  current_vehicle?: (Vehicle & id) | string;
}
export namespace courier {
  const BUCKET_ID = '61bc93030ba24b002d19784a';
  export function get(...args: getArgs) {
    return Bucket.data.get<Courier & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Courier & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Courier, '_id'>) {
    ['current_orders', 'current_vehicle'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Courier & id) {
    ['current_orders', 'current_vehicle'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Courier> & id) {
    ['current_orders', 'current_vehicle'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Courier & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Courier & id>(BUCKET_ID, ...args);
    }
  }
}

export interface User {
  _id?: string;
  identity_id?: string;
  name?: string;
  surname?: string;
  phone?: string;
  email?:string;
  profile_picture?:string;
  address?: {
    title?: string;
    country?: string;
    province?: string;
    district?: string;
    full_address?: string;
    phone?: string;
  }[];
}
export namespace user {
  const BUCKET_ID = '61bc93040ba24b002d19784d';
  export function get(...args: getArgs) {
    return Bucket.data.get<User & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<User & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<User, '_id'>) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: User & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<User> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<User & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<User & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Order {
  _id?: string;
  delivery_location?: { type: 'Point'; coordinates: [number, number] };
  user?: (User & id) | string;
  courier?: (Courier & id) | string;
  created_at?: Date | string;
  status?: 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  price?: number;
  payment_method?: 'cash' | 'credit_card' | 'online';
  note?: string;
  foods?: {
    _id?: string;
    name?: string;
    ingredients?: string[];
    price?: number;
    count?: number;
  }[];
  address?: {
    title?: string;
    country?: string;
    province?: string;
    district?: string;
    full_address?: string;
    phone?: string;
  };
  rating?: (Rating & id) | string;
}
export namespace order {
  const BUCKET_ID = '61bc93050ba24b002d197850';
  export function get(...args: getArgs) {
    return Bucket.data.get<Order & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Order & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Order, '_id'>) {
    ['user', 'courier'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Order & id) {
    ['user', 'courier'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Order> & id) {
    ['user', 'courier'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Order & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Order & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Vehicle {
  _id?: string;
  name?: string;
}
export namespace vehicle {
  const BUCKET_ID = '61bc93060ba24b002d197853';
  export function get(...args: getArgs) {
    return Bucket.data.get<Vehicle & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Vehicle & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Vehicle, '_id'>) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Vehicle & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Vehicle> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Vehicle & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Vehicle & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Ingredient {
  _id?: string;
  name?: string;
  price?: number;
  stock?: number;
  unit?: string;
  calories?: number;
}
export namespace ingredient {
  const BUCKET_ID = '61bc93070ba24b002d197856';
  export function get(...args: getArgs) {
    return Bucket.data.get<Ingredient & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Ingredient & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Ingredient, '_id'>) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Ingredient & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Ingredient> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Ingredient & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Ingredient & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Rating {
  _id?: string;
  user?: (User & id) | string;
  rating?: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}
export namespace rating {
  const BUCKET_ID = '61bc93080ba24b002d197859';
  export function get(...args: getArgs) {
    return Bucket.data.get<Rating & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Rating & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Rating, '_id'>) {
    ['user'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Rating & id) {
    ['user'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Rating> & id) {
    ['user'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Rating & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Rating & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Food {
  _id?: string;
  name?: string;
  categories?: ((Category & id) | string)[];
  description?: string;
  image?: string;
  original_price?: number;
  is_available?: boolean;
  ratings?: ((Rating & id) | string)[];
  preparation_time?: number;
  extra_ingredients?: ((Ingredient & id) | string)[];
  removable_ingredients?: ((Ingredient & id) | string)[];
  calories?: number;
  ingredients?: ((Ingredient & id) | string)[];
  price?: number;
}
export namespace food {
  const BUCKET_ID = '61bc93090ba24b002d19785c';
  export function get(...args: getArgs) {
    return Bucket.data.get<Food & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Food & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Food, '_id'>) {
    [
      'ratings',
      'extra_ingredients',
      'removable_ingredients',
      'ingredients',
    ].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Food & id) {
    [
      'ratings',
      'extra_ingredients',
      'removable_ingredients',
      'ingredients',
    ].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Food> & id) {
    [
      'ratings',
      'extra_ingredients',
      'removable_ingredients',
      'ingredients',
    ].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Food & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Food & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Discount {
  _id?: string;
  name?: string;
  foods?: ((Food & id) | string)[];
  from?: Date | string;
  until?: Date | string;
  discount?: number;
}
export namespace discount {
  const BUCKET_ID = '61bc930a0ba24b002d19785f';
  export function get(...args: getArgs) {
    return Bucket.data.get<Discount & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Discount & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Discount, '_id'>) {
    ['foods'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Discount & id) {
    ['foods'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Discount> & id) {
    ['foods'].forEach((field) => {
      if (typeof document[field] == 'object') {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Discount & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Discount & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Category {
  _id?: string;
  name?: string;
}
export namespace category {
  const BUCKET_ID = '61bc930c0ba24b002d197862';
  export function get(...args: getArgs) {
    return Bucket.data.get<Category & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Category & id>(BUCKET_ID, ...args);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Category & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Category & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Address {
  _id?: string;
  title?: string;
  location?: { type: 'Point'; coordinates: [number, number] };
}
export namespace address {
  const BUCKET_ID = '61bc930d0ba24b002d197865';
  export function get(...args: getArgs) {
    return Bucket.data.get<Address & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Address & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Address, '_id'>) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Address & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Address> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Address & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Address & id>(BUCKET_ID, ...args);
    }
  }
}
