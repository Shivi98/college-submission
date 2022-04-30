import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { KeyValue }     from "@angular/common";
import { IsObjectPipe } from "../pipes/is-object.pipe";
import {
  faFolderOpen,
  faFolderClosed,
  faFile
}                       from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent {
  faFolderOpen = faFolderOpen;
  faFolderClosed = faFolderClosed;
  faFile = faFile;
  @Input() schema!: any;
  expanded = new Set<string>();
  isObjectPipe = new IsObjectPipe();
  @Output() keySelected: EventEmitter<string[]> = new EventEmitter<string[]>();
  selectedKey = "";
  selectedPath: string[] = [];

  onLabelClick(entry: KeyValue<string, unknown>) {
    if (this.isObjectPipe.transform(this.schema[entry.key] as any)) {
      if (!this.expanded.has(entry.key)) {
        this.expanded.clear();
        this.expanded.add(entry.key);
      } else {
        this.expanded.clear();
      }
    } else {
      this.selectedKey = entry.key;
      this.selectedPath = [entry.key];
      this.keySelected.emit([entry.key]);
    }
  }

  onKeySelected($event: string[], key: string) {
    this.selectedPath = [key, ...$event];
    this.keySelected.emit(this.selectedPath);
  }
}
