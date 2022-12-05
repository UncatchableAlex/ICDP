// Queue to be used to match players
class Queue {
  constructor() {
    this.queue = [];
  }

  // Enqueue on to queue
  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.queue.shift();
    }
    return "empty";
  }

  dequeue4() {
    if (this.getLength() >= 4) {
      return this.queue.shift(4);
    }
    return "too few in queue";
  }

  isEmpty() {
    return this.queue.length == 0;
  }

  getLength() {
    return this.queue.length;
  }

  printQueue() {
    str = "[ ";
    this.queue.forEach((element) => {
      str += element + ", ";
    });
    str += "]";
  }
}

exports.Queue = Queue;