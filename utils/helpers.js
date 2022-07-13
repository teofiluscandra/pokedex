import colors from '../constants/color';

export function capitalizeWord(name) {
  const splitNameByStrip = name.split("-");
  for(let i = 0; i < splitNameByStrip.length; i++) {
    splitNameByStrip[i] = capitalizeName(splitNameByStrip[i]);
  }
  return splitNameByStrip.join(' ');
}

export function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getPokeIndex(id) {
  return ('000' + (id)).slice(-3)
}

export function getColorByTypes(types) {
  const primaryType = types.length > 0 ? types[0].type.name : null
  return colors[primaryType]
}

export function getColorByType(type) {
  return colors[type]
}
