# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: types.proto
# plugin: python-betterproto
from dataclasses import dataclass
from typing import List

import betterproto


@dataclass
class PickStats(betterproto.Message):
    mu_r: float = betterproto.double_field(1)
    mu_g: float = betterproto.double_field(2)
    mu_b: float = betterproto.double_field(3)
    perc_r: float = betterproto.double_field(4)
    perc_g: float = betterproto.double_field(5)
    perc_b: float = betterproto.double_field(6)
    sigma_r: float = betterproto.double_field(7)
    sigma_g: float = betterproto.double_field(8)
    sigma_b: float = betterproto.double_field(9)
    num_pixels: int = betterproto.int32_field(10)
    pick_name: str = betterproto.string_field(11)


@dataclass
class ClipboardViewColumns(betterproto.Message):
    name: bool = betterproto.bool_field(1)
    colour: bool = betterproto.bool_field(2)
    mu_r_g_b: bool = betterproto.bool_field(3)
    perc_r_g_b: bool = betterproto.bool_field(4)
    sigma_r_g_b: bool = betterproto.bool_field(5)
    num_pixels: bool = betterproto.bool_field(6)


@dataclass
class ClipboardContent(betterproto.Message):
    rows: List["PickStats"] = betterproto.message_field(1)
    blotch_i_ds: List[int] = betterproto.int32_field(2)


@dataclass
class PickedCircle(betterproto.Message):
    center_row: float = betterproto.double_field(1)
    center_col: float = betterproto.double_field(2)
    radius: float = betterproto.double_field(3)
    img_file_name: str = betterproto.string_field(4)


@dataclass
class FolderImage(betterproto.Message):
    """an image in the currently selected folder"""

    file_name: str = betterproto.string_field(1)
    thumbnail_img_v_f_n: str = betterproto.string_field(2)


@dataclass
class ScanFolder(betterproto.Message):
    """the currently selected folder"""

    folder_images: List["FolderImage"] = betterproto.message_field(1)


@dataclass
class ReadBlotch(betterproto.Message):
    circle: "PickedCircle" = betterproto.message_field(1)
    stats: "PickStats" = betterproto.message_field(2)
    context_v_f_n: str = betterproto.string_field(3)
    compare_v_f_n: str = betterproto.string_field(4)
    blotch_i_d: int = betterproto.int32_field(5)


@dataclass
class ActiveImage(betterproto.Message):
    file_name: str = betterproto.string_field(1)
    img_data_v_f_n: str = betterproto.string_field(2)
    read_blotches: List["ReadBlotch"] = betterproto.message_field(3)
    downsample_factor: int = betterproto.int32_field(4)
    clipboard_view_columns: "ClipboardViewColumns" = betterproto.message_field(5)


@dataclass
class UIState(betterproto.Message):
    open_folder: "ScanFolder" = betterproto.message_field(1)
    selected_folder_img_idx: int = betterproto.int32_field(2)
    active_image: "ActiveImage" = betterproto.message_field(3)
    clipboard_content: "ClipboardContent" = betterproto.message_field(4)
