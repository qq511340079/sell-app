/**
 * Created by tw on 2017/4/26.
 */
export function saveToLocalStore(id, key, value) {
  if (id && key) {
    let seller = window.localStorage._seller_;
    if (!seller) {
      seller = {};
      seller[id] = {};
    } else {
      seller = JSON.parse(seller);
    }
    seller[id][key] = value;
    window.localStorage._seller_ = JSON.stringify(seller);
  }
}

export function getFromLocalStore(id, key, def) {
  let seller = window.localStorage._seller_;
  if (seller) {
    seller = JSON.parse(seller)[id];
    if (!seller) {
      return def;
    } else {
      return seller[key] || def;
    }
  } else {
    return def;
  }
}
