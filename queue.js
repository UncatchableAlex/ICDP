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
    if (!this.queue.isEmpty()) {
      return this.queue.shift();
    }
    return "empty";
  }

  dequeue4() {
    if (this.queueLength() >= 4) {
      return this.queue.shift(4);
    }
    return "too few in queue";
  }

  isEmpty() {
    return this.queue.length == 0;
  }

  queueLength() {
    return this.queue.length();
  }

  printQueue() {
    str = "[ ";
    this.queue.forEach((element) => {
      str += element + ", ";
    });
    str += "]";
  }
}
