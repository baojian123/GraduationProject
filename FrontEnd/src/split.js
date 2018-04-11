
function getTrain (data) {
  // console.log(data.data.result)
  var cnt = 0
  var results = []
  var temp = data
  if (typeof (data) === 'string') {
    temp = JSON.parse(data)
  }
  for (var i in temp.data.result) {
    var json = {
      'train_status': 1,
      'train_code': 3,
      'from_station': 4,
      'to_station': 5,
      'start_time': 8,
      'end_time': 9,
      'cost_time': 10,
      'order_status': 11,
      'train_date': 13,
      'hard_berth': 21,
      'soft_berth': 23,
      'second_class': 30,
      'first_class': 31,
      'special_class': 32,
      'motor_berth': 33
    }
    var str = temp.data.result[i]
    var arr = str.split('|')
    // for (var j in arr) {
    //   console.log(j + ': ' + arr[j])
    // }
    for (var j in json) {
      json[j] = arr[json[j]]
    }
    results[cnt++] = json
  }
  return results
}

exports.getTrain = getTrain
